package com.vizkor.koreanlockstudy;

import android.app.Activity;
import android.content.*;
import android.graphics.Typeface;
import android.os.*;
import android.view.*;
import android.widget.*;
import java.util.Locale;

public class StudyLockActivity extends Activity {
    boolean preview = false;

    final BroadcastReceiver unlock = new BroadcastReceiver() {
        @Override public void onReceive(Context c, Intent i) {
            if (Intent.ACTION_USER_PRESENT.equals(i.getAction()) && !preview) finish();
        }
    };

    @Override public void onCreate(Bundle b) {
        super.onCreate(b);
        preview = getIntent().getBooleanExtra("preview", false);

        if (Build.VERSION.SDK_INT >= 27) setShowWhenLocked(true);
        else getWindow().addFlags(WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED);

        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        getWindow().setStatusBarColor(StudyCore.BG);
        getWindow().setNavigationBarColor(StudyCore.BG);

        IntentFilter f = new IntentFilter(Intent.ACTION_USER_PRESENT);
        if (Build.VERSION.SDK_INT >= 33) {
            registerReceiver(unlock, f, Context.RECEIVER_NOT_EXPORTED);
        } else {
            registerReceiver(unlock, f);
        }

        render(ids(getIntent()));
    }

    @Override protected void onNewIntent(Intent i) {
        super.onNewIntent(i);
        setIntent(i);
        preview = i.getBooleanExtra("preview", false);
        render(ids(i));
    }

    int[] ids(Intent i) {
        int[] x = i.getIntArrayExtra("ids");
        return x == null || x.length != 5 ? StudyCore.Deck.preview() : x;
    }

    void render(int[] ids) {
        ScrollView s = new ScrollView(this);
        s.setFillViewport(true);
        s.setBackgroundColor(StudyCore.BG);

        LinearLayout r = new LinearLayout(this);
        r.setOrientation(LinearLayout.VERTICAL);
        r.setPadding(dp(16), dp(18), dp(16), dp(24));
        s.addView(r);

        r.addView(t("KOREAN LOCK STUDY", 13, StudyCore.ACC, true));

        TextView h = t("5 ITEMS • TAP A CARD TO ANALYZE", 21, StudyCore.TXT, true);
        h.setPadding(0, dp(5), 0, dp(4));
        r.addView(h);

        TextView prog = t(
            preview ? "Preview mode" :
                ("Deck " + StudyCore.Deck.pos(this) + " / 10,000 • Cycle " +
                    StudyCore.Deck.cycle(this)),
            13, StudyCore.SUB, false);
        prog.setPadding(0, 0, 0, dp(12));
        r.addView(prog);

        for (int n=0; n<5; n++) {
            r.addView(cardView(StudyCore.card(ids[n]), n+1));
            View g = new View(this);
            r.addView(g, new LinearLayout.LayoutParams(1, dp(9)));
        }

        Button b = new Button(this);
        b.setText(preview ? "CLOSE PREVIEW" : "CONTINUE TO PHONE");
        b.setTextColor(StudyCore.TXT);
        b.setTextSize(15);
        b.setTypeface(Typeface.DEFAULT, Typeface.BOLD);
        b.setAllCaps(false);
        b.setBackgroundColor(StudyCore.ACC);
        b.setOnClickListener(v -> finish());
        r.addView(b, new LinearLayout.LayoutParams(-1, -2));

        TextView safe = t(
            "Normal Android PIN / fingerprint remains underneath.",
            12, StudyCore.SUB, false);
        safe.setGravity(Gravity.CENTER);
        safe.setPadding(0, dp(8), 0, 0);
        r.addView(safe);

        setContentView(s);
    }

    View cardView(StudyCore.CardData d, int n) {
        LinearLayout b = new LinearLayout(this);
        b.setOrientation(LinearLayout.VERTICAL);
        b.setPadding(dp(14), dp(12), dp(14), dp(12));
        b.setBackgroundColor(StudyCore.CARD);

        b.addView(t(
            String.format(Locale.US, "%02d • VOCAB %s", n, d.fkr),
            12, StudyCore.OK, true));

        TextView kr = t(d.kr, 21, StudyCore.TXT, true);
        kr.setPadding(0, dp(5), 0, dp(5));
        b.addView(kr);

        b.addView(t(d.en, 14, StudyCore.SUB, false));

        TextView tl = t(d.tl, 14, StudyCore.SUB, false);
        tl.setPadding(0, dp(2), 0, dp(7));
        b.addView(tl);

        TextView focus = t(
            d.fkr + " • " + d.fen + " • " + d.ftl,
            13, StudyCore.ACC, true);
        focus.setPadding(0, 0, 0, dp(7));
        b.addView(focus);

        TextView a = t(
            "SENTENCE ANALYZER\n• " +
                d.detail.replace("\n", "\n• ") +
                "\n• Ending: -아요 / -어요 / -해요 polite style",
            13, StudyCore.TXT, false);
        a.setPadding(dp(10), dp(10), dp(10), dp(10));
        a.setBackgroundColor(StudyCore.CARD2);
        a.setVisibility(View.GONE);
        b.addView(a, new LinearLayout.LayoutParams(-1, -2));

        b.addView(t("Tap to show / hide analyzer", 12, StudyCore.SUB, true));
        b.setOnClickListener(v ->
            a.setVisibility(a.getVisibility() == View.VISIBLE ? View.GONE : View.VISIBLE));

        return b;
    }

    TextView t(String x, int sp, int c, boolean bold) {
        TextView v = new TextView(this);
        v.setText(x);
        v.setTextSize(sp);
        v.setTextColor(c);
        if (bold) v.setTypeface(Typeface.DEFAULT, Typeface.BOLD);
        return v;
    }

    int dp(int x) {
        return Math.round(x * getResources().getDisplayMetrics().density);
    }

    @Override public void onDestroy() {
        try { unregisterReceiver(unlock); } catch (Exception ignored) { }
        super.onDestroy();
    }
}
