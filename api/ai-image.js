// Preview-safe AI image endpoint for VIZKOR noun image testing.
// Main/production branch is untouched; this file exists only on the preview branch.
export const config = { api: { bodyParser: true } };

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
}

function shortMessage(value, max = 700) {
  const s = String(value ?? '').replace(/\s+/g, ' ').trim();
  return s.length > max ? s.slice(0, max) + '…' : s;
}

async function productionFallback(reqBody) {
  // Useful when STABILITY_API_KEY was configured only for Production in Vercel.
  const r = await fetch('https://vizkor.vercel.app/api/ai-image', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reqBody)
  });
  const text = await r.text();
  let data = {};
  try { data = JSON.parse(text); } catch { data = {}; }
  return { ok: r.ok, status: r.status, data, text };
}

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt, width = 768, height = 768, style = 'realistic educational photography' } = req.body || {};
    if (!prompt || !String(prompt).trim()) {
      return res.status(400).json({ error: 'Missing image prompt' });
    }

    const key = process.env.STABILITY_API_KEY;

    // Preview deployments often fail here when the secret is Production-scoped only.
    // Try the production API as a safe server-side fallback without exposing the key.
    if (!key) {
      try {
        const fallback = await productionFallback({ prompt, width, height, style });
        if (fallback.ok && fallback.data?.dataUrl) {
          return res.status(200).json({ dataUrl: fallback.data.dataUrl, source: 'production-api-fallback' });
        }
        return res.status(503).json({
          error: `STABILITY_API_KEY is not configured for the Vercel Preview environment. Production fallback also failed (HTTP ${fallback.status}): ${shortMessage(fallback.data?.error || fallback.text || 'unknown error')}`,
          code: 'PREVIEW_STABILITY_KEY_MISSING'
        });
      } catch (fallbackErr) {
        return res.status(503).json({
          error: `STABILITY_API_KEY is not configured for the Vercel Preview environment, and the production fallback could not be reached: ${shortMessage(fallbackErr?.message)}`,
          code: 'PREVIEW_STABILITY_KEY_MISSING'
        });
      }
    }

    // Current Stable Image Core format: multipart/form-data with prompt and optional
    // aspect_ratio/output_format. The old "mode=text-to-image" field was removed.
    const form = new FormData();
    form.append('prompt', `${String(prompt).trim()}, ${style}, clean educational composition`);
    form.append('output_format', 'webp');
    form.append('aspect_ratio', width === height ? '1:1' : (width > height ? '3:2' : '2:3'));
    form.append('negative_prompt', 'text, captions, letters, watermark, logo, collage, unrelated objects, distorted anatomy, duplicate subject');

    const r = await fetch('https://api.stability.ai/v2beta/stable-image/generate/core', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${key}`,
        'Accept': 'image/*'
      },
      body: form
    });

    if (!r.ok) {
      const msg = await r.text().catch(() => String(r.status));
      return res.status(r.status >= 400 && r.status < 600 ? r.status : 502).json({
        error: `Stability API ${r.status}: ${shortMessage(msg)}`,
        code: 'STABILITY_UPSTREAM_ERROR'
      });
    }

    const bytes = await r.arrayBuffer();
    const base64 = Buffer.from(bytes).toString('base64');
    return res.status(200).json({
      dataUrl: `data:image/webp;base64,${base64}`,
      source: 'preview-stability-api'
    });
  } catch (err) {
    console.error('Preview AI endpoint error:', err);
    return res.status(500).json({
      error: `AI endpoint failed: ${shortMessage(err?.message || err)}`,
      code: 'PREVIEW_AI_ENDPOINT_ERROR'
    });
  }
}
