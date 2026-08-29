package com.vizkor.koreanlockstudy;

import android.Manifest;
import android.app.Activity;
import android.content.ComponentName;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Typeface;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.provider.Settings;
import android.view.View;
import android.widget.*;

public class MainActivity extends Activity {
    static final int BG=0xFF0B1020, CARD=0xFF141B2D, TXT=0xFFF7F8FC, SUB=0xFFB8C1D9, ACC=0xFF6D9BFF;
    TextView status;
    Button enable;

    @Override public void onCreate(Bundle b) {
        super.onCreate(b);
        if (Build.VERSION.SDK_INT >= 33 &&
            checkSelfPermission(Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED) {
            requestPermissions(new String[]{Manifest.permission.POST_NOTIFICATIONS}, 100);
        }
        build();
    }

    @Override public void onResume() {
        super.onResume();
        refresh();
    }

    void build() {
        ScrollView s = new ScrollView(this);
        s.setFillViewport(true);
        s.setBackgroundColor(BG);

        LinearLayout r = new LinearLayout(this);
        r.setOrientation(LinearLayout.VERTICAL);
        r.setPadding(dp(20), dp(26), dp(20), dp(32));
        s.addView(r);

        r.addView(tv("KOREAN LOCK STUDY", 28, TXT, true));

        TextView intro = tv(
            "5 bagong Korean cards kada screen wake. 10,000 shuffled sentence cards, may English, Tagalog at sentence analyzer.",
            15, SUB, false);
        intro.setPadding(0, dp(8), 0, dp(16));
        r.addView(intro);

        status = tv("", 14, TXT, true);
        status.setPadding(dp(14), dp(14), dp(14), dp(14));
        status.setBackgroundColor(CARD);
        r.addView(status, full());

        gap(r, 12);
        enable = btn("ENABLE LOCK STUDY");
        enable.setOnClickListener(v -> toggle());
        r.addView(enable, full());

        gap(r, 10);
        Button overlay = btn("GRANT DISPLAY OVER APPS");
        overlay.setOnClickListener(v -> startActivity(
            new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
                Uri.parse("package:" + getPackageName()))));
        r.addView(overlay, full());

        gap(r, 10);
        Button battery = btn("OPEN BATTERY SETTINGS");
        battery.setOnClickListener(v -> {
            try {
                startActivity(new Intent(Settings.ACTION_IGNORE_BATTERY_OPTIMIZATION_SETTINGS));
            } catch (Exception e) {
                startActivity(new Intent(Settings.ACTION_SETTINGS));
            }
        });
        r.addView(battery, full());

        gap(r, 10);
        Button xiaomi = btn("POCO / XIAOMI AUTOSTART");
        xiaomi.setOnClickListener(v -> openXiaomi());
        r.addView(xiaomi, full());

        gap(r, 10);
        Button preview = btn("PREVIEW 5 CARDS");
        preview.setOnClickListener(v -> {
            Intent i = new Intent(this, StudyLockActivity.class);
            i.putExtra("ids", StudyCore.Deck.preview());
            i.putExtra("preview", true);
            startActivity(i);
        });
        r.addView(preview, full());

        gap(r, 18);
        TextView n = tv(
            "SETUP SA POCO / XIAOMI\n\n" +
            "1. Grant Display over apps.\n" +
            "2. Battery: No restrictions / Unrestricted.\n" +
            "3. Enable Autostart.\n" +
            "4. Payagan ang background pop-up windows kung may option.\n\n" +
            "SECURITY\nHindi nito pinapalitan o bina-bypass ang PIN/fingerprint lock ng Android.",
            14, SUB, false);
        n.setPadding(dp(14), dp(14), dp(14), dp(14));
        n.setBackgroundColor(CARD);
        r.addView(n, full());

        setContentView(s);
        refresh();
    }

    void toggle() {
        boolean on = !StudyCore.Deck.enabled(this);
        StudyCore.Deck.setEnabled(this, on);
        Intent i = new Intent(this, ScreenMonitorService.class);
        if (on) {
            try {
                if (Build.VERSION.SDK_INT >= 26) startForegroundService(i);
                else startService(i);
            } catch (Exception e) {
                Toast.makeText(this, "Check background permissions", Toast.LENGTH_LONG).show();
            }
        } else {
            stopService(i);
        }
        refresh();
    }

    void refresh() {
        if (status == null) return;
        boolean on = StudyCore.Deck.enabled(this);
        boolean ov = Build.VERSION.SDK_INT < 23 || Settings.canDrawOverlays(this);
        status.setText(
            "STATUS: " + (on ? "ACTIVE" : "OFF") +
            "\nDisplay-over-apps: " + (ov ? "Granted" : "Not granted") +
            "\nDeck: " + StudyCore.Deck.pos(this) + " / 10,000   •   Cycle " +
            StudyCore.Deck.cycle(this));
        enable.setText(on ? "DISABLE LOCK STUDY" : "ENABLE LOCK STUDY");
    }

    void openXiaomi() {
        try {
            Intent i = new Intent();
            i.setComponent(new ComponentName(
                "com.miui.securitycenter",
                "com.miui.permcenter.autostart.AutoStartManagementActivity"));
            startActivity(i);
        } catch (Exception e) {
            startActivity(new Intent(
                Settings.ACTION_APPLICATION_DETAILS_SETTINGS,
                Uri.parse("package:" + getPackageName())));
        }
    }

    Button btn(String x) {
        Button b = new Button(this);
        b.setText(x);
        b.setTextColor(TXT);
        b.setTextSize(14);
        b.setTypeface(Typeface.DEFAULT, Typeface.BOLD);
        b.setAllCaps(false);
        b.setBackgroundColor(ACC);
        b.setPadding(dp(12), dp(11), dp(12), dp(11));
        return b;
    }

    TextView tv(String x, int sp, int c, boolean bold) {
        TextView t = new TextView(this);
        t.setText(x);
        t.setTextSize(sp);
        t.setTextColor(c);
        if (bold) t.setTypeface(Typeface.DEFAULT, Typeface.BOLD);
        return t;
    }

    int dp(int x) {
        return Math.round(x * getResources().getDisplayMetrics().density);
    }

    LinearLayout.LayoutParams full() {
        return new LinearLayout.LayoutParams(-1, -2);
    }

    void gap(LinearLayout r, int x) {
        View v = new View(this);
        r.addView(v, new LinearLayout.LayoutParams(1, dp(x)));
    }
}
