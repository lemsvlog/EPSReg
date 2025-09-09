// api/ai-image.js
export const config = { api: { bodyParser: true } };

export default async function handler(req, res) {
  // CORS / preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt, width = 512, height = 512, style = 'cartoon' } = req.body || {};
    if (!prompt) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      return res.status(400).json({ error: 'Missing prompt' });
    }

    // Build a Stability request
    const form = new FormData();
    form.append('prompt', `${prompt}, white or very light background, ${style}`);
    form.append('mode', 'text-to-image');
    form.append('output_format', 'webp');
    form.append('aspect_ratio', width === height ? '1:1' : (width > height ? '3:2' : '2:3'));

    const r = await fetch('https://api.stability.ai/v2beta/stable-image/generate/core', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.STABILITY_API_KEY}`,
        'Accept': 'image/*'
      },
      body: form
    });

    if (!r.ok) {
      const msg = await r.text().catch(()=>String(r.status));
      res.setHeader('Access-Control-Allow-Origin', '*');
      return res.status(500).json({ error: `Stability error: ${msg}` });
    }

    const bytes = await r.arrayBuffer();
    const base64 = Buffer.from(bytes).toString('base64');
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json({ dataUrl: `data:image/webp;base64,${base64}` });
  } catch (err) {
    console.error(err);
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(500).json({ error: 'AI endpoint failed' });
  }
}
