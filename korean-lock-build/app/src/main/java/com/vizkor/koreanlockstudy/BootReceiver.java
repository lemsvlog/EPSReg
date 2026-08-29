package com.vizkor.koreanlockstudy;

import android.content.*;
import android.os.Build;

public class BootReceiver extends BroadcastReceiver {
    @Override public void onReceive(Context c, Intent i) {
        if (!StudyCore.Deck.enabled(c)) return;
        try {
            Intent s = new Intent(c, ScreenMonitorService.class);
            if (Build.VERSION.SDK_INT >= 26) c.startForegroundService(s);
            else c.startService(s);
        } catch (Exception ignored) { }
    }
}
