package com.vizkor.koreanlockstudy;

import android.app.*;
import android.content.*;
import android.os.*;

public class ScreenMonitorService extends Service {
    static final String CH = "kls_active";
    long last = 0;

    final BroadcastReceiver rx = new BroadcastReceiver() {
        @Override public void onReceive(Context c, Intent i) {
            if (Intent.ACTION_SCREEN_ON.equals(i.getAction())) showIfLocked();
        }
    };

    @Override public void onCreate() {
        super.onCreate();
        createChannel();
        startForeground(3107, notification());

        IntentFilter f = new IntentFilter();
        f.addAction(Intent.ACTION_SCREEN_ON);
        f.addAction(Intent.ACTION_SCREEN_OFF);
        if (Build.VERSION.SDK_INT >= 33) {
            registerReceiver(rx, f, Context.RECEIVER_NOT_EXPORTED);
        } else {
            registerReceiver(rx, f);
        }
    }

    @Override public int onStartCommand(Intent i, int flags, int id) {
        if (!StudyCore.Deck.enabled(this)) {
            stopSelf();
            return START_NOT_STICKY;
        }
        return START_STICKY;
    }

    void showIfLocked() {
        if (!StudyCore.Deck.enabled(this)) return;
        long now = System.currentTimeMillis();
        if (now - last < 1800) return;

        KeyguardManager k = (KeyguardManager) getSystemService(KEYGUARD_SERVICE);
        if (k == null || !k.isKeyguardLocked()) return;

        last = now;
        Intent i = new Intent(this, StudyLockActivity.class);
        i.putExtra("ids", StudyCore.Deck.next(this));
        i.addFlags(
            Intent.FLAG_ACTIVITY_NEW_TASK |
            Intent.FLAG_ACTIVITY_CLEAR_TOP |
            Intent.FLAG_ACTIVITY_SINGLE_TOP |
            Intent.FLAG_ACTIVITY_EXCLUDE_FROM_RECENTS |
            Intent.FLAG_ACTIVITY_NO_ANIMATION
        );
        try {
            startActivity(i);
        } catch (Exception ignored) { }
    }

    void createChannel() {
        if (Build.VERSION.SDK_INT >= 26) {
            NotificationChannel c = new NotificationChannel(
                CH, "Korean Lock Study", NotificationManager.IMPORTANCE_LOW);
            c.setDescription("Keeps lock-screen study trigger active.");
            getSystemService(NotificationManager.class).createNotificationChannel(c);
        }
    }

    Notification notification() {
        Intent o = new Intent(this, MainActivity.class);
        PendingIntent p = PendingIntent.getActivity(
            this, 0, o,
            PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);

        Notification.Builder b = Build.VERSION.SDK_INT >= 26
            ? new Notification.Builder(this, CH)
            : new Notification.Builder(this);

        return b
            .setContentTitle("Korean Lock Study is active")
            .setContentText("5 new cards appear when the locked screen wakes.")
            .setSmallIcon(android.R.drawable.ic_lock_idle_lock)
            .setOngoing(true)
            .setContentIntent(p)
            .build();
    }

    @Override public void onDestroy() {
        try { unregisterReceiver(rx); } catch (Exception ignored) { }
        super.onDestroy();
    }

    @Override public IBinder onBind(Intent i) {
        return null;
    }
}
