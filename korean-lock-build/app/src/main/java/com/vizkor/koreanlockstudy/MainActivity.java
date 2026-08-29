package com.vizkor.koreanlockstudy;

import android.Manifest;
import android.app.*;
import android.content.*;
import android.content.pm.PackageManager;
import android.content.pm.ServiceInfo;
import android.graphics.Typeface;
import android.net.Uri;
import android.os.*;
import android.provider.Settings;
import android.view.*;
import android.widget.*;
import java.util.*;

public class MainActivity extends Activity {
    static final int BG=0xFF0B1020, CARD=0xFF141B2D, CARD2=0xFF1C2640, TXT=0xFFF7F8FC, SUB=0xFFB8C1D9, ACC=0xFF6D9BFF, OK=0xFF8FE3B3;
    TextView status; Button enable;

    @Override public void onCreate(Bundle b){
        super.onCreate(b);
        if(Build.VERSION.SDK_INT>=33 && checkSelfPermission(Manifest.permission.POST_NOTIFICATIONS)!=PackageManager.PERMISSION_GRANTED)
            requestPermissions(new String[]{Manifest.permission.POST_NOTIFICATIONS},100);
        build();
    }
    @Override public void onResume(){super.onResume(); refresh();}

    void build(){
        ScrollView s=new ScrollView(this); s.setFillViewport(true); s.setBackgroundColor(BG);
        LinearLayout r=new LinearLayout(this); r.setOrientation(LinearLayout.VERTICAL); r.setPadding(dp(20),dp(26),dp(20),dp(32)); s.addView(r);
        r.addView(tv("KOREAN LOCK STUDY",28,TXT,true));
        TextView intro=tv("5 bagong Korean cards kada screen wake. 10,000 shuffled sentence cards, may English, Tagalog at sentence analyzer.",15,SUB,false);
        intro.setPadding(0,dp(8),0,dp(16)); r.addView(intro);
        status=tv("",14,TXT,true); status.setPadding(dp(14),dp(14),dp(14),dp(14)); status.setBackgroundColor(CARD); r.addView(status,full());
        gap(r,12);
        enable=btn("ENABLE LOCK STUDY"); enable.setOnClickListener(v->toggle()); r.addView(enable,full());
        gap(r,10);
        Button overlay=btn("GRANT DISPLAY OVER APPS"); overlay.setOnClickListener(v->startActivity(new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION, Uri.parse("package:"+getPackageName())))); r.addView(overlay,full());
        gap(r,10);
        Button battery=btn("OPEN BATTERY SETTINGS"); battery.setOnClickListener(v->{try{startActivity(new Intent(Settings.ACTION_IGNORE_BATTERY_OPTIMIZATION_SETTINGS));}catch(Exception e){startActivity(new Intent(Settings.ACTION_SETTINGS));}}); r.addView(battery,full());
        gap(r,10);
        Button xiaomi=btn("POCO / XIAOMI AUTOSTART"); xiaomi.setOnClickListener(v->openXiaomi()); r.addView(xiaomi,full());
        gap(r,10);
        Button preview=btn("PREVIEW 5 CARDS"); preview.setOnClickListener(v->{Intent i=new Intent(this,StudyLockActivity.class); i.putExtra("ids",Deck.preview()); i.putExtra("preview",true); startActivity(i);}); r.addView(preview,full());
        gap(r,18);
        TextView n=tv("SETUP SA POCO / XIAOMI\n\n1. Grant Display over apps.\n2. Battery: No restrictions / Unrestricted.\n3. Enable Autostart.\n4. Payagan ang background pop-up windows kung may option.\n\nSECURITY\nHindi nito pinapalitan o bina-bypass ang PIN/fingerprint lock ng Android.",14,SUB,false);
        n.setPadding(dp(14),dp(14),dp(14),dp(14)); n.setBackgroundColor(CARD); r.addView(n,full());
        setContentView(s); refresh();
    }
    void toggle(){
        boolean on=!Deck.enabled(this); Deck.setEnabled(this,on);
        Intent i=new Intent(this,ScreenMonitorService.class);
        if(on){try{if(Build.VERSION.SDK_INT>=26)startForegroundService(i);else startService(i);}catch(Exception e){Toast.makeText(this,"Check background permissions",Toast.LENGTH_LONG).show();}}
        else stopService(i);
        refresh();
    }
    void refresh(){
        if(status==null)return;
        boolean on=Deck.enabled(this), ov=Build.VERSION.SDK_INT<23||Settings.canDrawOverlays(this);
        status.setText("STATUS: "+(on?"ACTIVE":"OFF")+"\nDisplay-over-apps: "+(ov?"Granted":"Not granted")+"\nDeck: "+Deck.pos(this)+" / 10,000   •   Cycle "+Deck.cycle(this));
        enable.setText(on?"DISABLE LOCK STUDY":"ENABLE LOCK STUDY");
    }
    void openXiaomi(){
        try{Intent i=new Intent(); i.setComponent(new ComponentName("com.miui.securitycenter","com.miui.permcenter.autostart.AutoStartManagementActivity")); startActivity(i);}
        catch(Exception e){startActivity(new Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS,Uri.parse("package:"+getPackageName())));}
    }
    Button btn(String x){Button b=new Button(this);b.setText(x);b.setTextColor(TXT);b.setTextSize(14);b.setTypeface(Typeface.DEFAULT,Typeface.BOLD);b.setAllCaps(false);b.setBackgroundColor(ACC);b.setPadding(dp(12),dp(11),dp(12),dp(11));return b;}
    TextView tv(String x,int sp,int c,boolean bold){TextView t=new TextView(this);t.setText(x);t.setTextSize(sp);t.setTextColor(c);if(bold)t.setTypeface(Typeface.DEFAULT,Typeface.BOLD);return t;}
    int dp(int x){return Math.round(x*getResources().getDisplayMetrics().density);}
    LinearLayout.LayoutParams full(){return new LinearLayout.LayoutParams(-1,-2);}
    void gap(LinearLayout r,int x){View v=new View(this);r.addView(v,new LinearLayout.LayoutParams(1,dp(x)));}

    public static class Deck {
        static final String P="kls_prefs",EN="enabled",SEED="seed",POS="pos",CYCLE="cycle";
        static android.content.SharedPreferences p(Context c){return c.getSharedPreferences(P,MODE_PRIVATE);}
        static boolean enabled(Context c){return p(c).getBoolean(EN,false);}
        static void setEnabled(Context c,boolean x){p(c).edit().putBoolean(EN,x).apply();}
        static int pos(Context c){return p(c).getInt(POS,0);}
        static int cycle(Context c){return p(c).getInt(CYCLE,1);}
        static synchronized int[] next(Context c){
            long seed=p(c).getLong(SEED,0); int pos=pos(c), cyc=cycle(c);
            if(seed==0){seed=System.currentTimeMillis()^0x5A17C0DEL;pos=0;}
            if(pos+5>10000){cyc++;seed=System.currentTimeMillis()^((long)cyc<<32);pos=0;}
            int[] d=shuffle(seed),out=Arrays.copyOfRange(d,pos,pos+5);pos+=5;
            p(c).edit().putLong(SEED,seed).putInt(POS,pos).putInt(CYCLE,cyc).apply();return out;
        }
        static int[] preview(){int[] d=shuffle(System.nanoTime()^System.currentTimeMillis());return Arrays.copyOfRange(d,0,5);}
        static int[] shuffle(long seed){int[] a=new int[10000];for(int i=0;i<a.length;i++)a[i]=i;Random r=new Random(seed);for(int i=a.length-1;i>0;i--){int j=r.nextInt(i+1),t=a[i];a[i]=a[j];a[j]=t;}return a;}
    }

    static class CardData {
        String kr,en,tl,fkr,fen,ftl,detail;
        CardData(String[] a){kr=a[0];en=a[1];tl=a[2];fkr=a[3];fen=a[4];ftl=a[5];detail=a[6];}
    }

    static final String[][] SUBJECTS={
        {"저는","I","Ako","저 + 는 = I/ako + topic particle"},
        {"우리는","We","Kami","우리 + 는 = we/kami + topic particle"},
        {"제 친구들은","My friends","Ang mga kaibigan ko","제 친구들 + 은 = my friends + topic particle"},
        {"학생들은","The students","Ang mga estudyante","학생들 + 은 = students + topic particle"},
        {"제 동료들은","My coworkers","Ang mga katrabaho ko","제 동료들 + 은 = coworkers + topic particle"}
    };
    static final String[][] TIMES={
        {"요즘","these days","nitong mga araw"},
        {"아침에","in the morning","sa umaga"},
        {"저녁에","in the evening","sa gabi"},
        {"쉬는 날에","on days off","kapag day off"},
        {"시간이 있을 때","when there is free time","kapag may libreng oras"}
    };
    static final String[][] FREQ={
        {"자주","often","madalas"},{"가끔","sometimes","paminsan-minsan"},{"보통","usually","karaniwan"},{"항상","always","palagi"},{"거의 매일","almost every day","halos araw-araw"},
        {"일주일에 한 번","once a week","minsan sa isang linggo"},{"일주일에 두 번","twice a week","dalawang beses sa isang linggo"},{"필요할 때","when needed","kapag kailangan"},{"가능하면","if possible","kung maaari"},{"시간이 나면","when time allows","kapag may oras"}
    };

    static final String[] RAW={
        "한국어를 공부해요.|study Korean.|nag-aaral ng Korean.|공부하다|to study|mag-aral|한국어를 = 한국어 + 를; 공부해요 = 공부하다 + polite 해요",
        "책을 읽어요.|read a book.|nagbabasa ng libro.|읽다|to read|magbasa|책을 = 책 + 을; 읽어요 = 읽다 + polite 어요",
        "물을 마셔요.|drink water.|umiinom ng tubig.|마시다|to drink|uminom|물을 = 물 + 을; 마셔요 = 마시다 + polite form",
        "밥을 먹어요.|eat a meal.|kumakain ng pagkain.|먹다|to eat|kumain|밥을 = 밥 + 을; 먹어요 = 먹다 + polite 어요",
        "음악을 들어요.|listen to music.|nakikinig ng musika.|듣다|to listen|makinig|음악을 = 음악 + 을; 들어요 = 듣다 irregular polite form",
        "운동을 해요.|exercise.|nag-eehersisyo.|운동하다|to exercise|mag-ehersisyo|운동을 = 운동 + 을; 해요 = 하다 + polite 해요",
        "친구에게 전화해요.|call a friend.|tumatawag sa kaibigan.|전화하다|to call|tumawag|친구에게 = friend + 에게; 전화해요 = 전화하다 + 해요",
        "메시지를 보내요.|send a message.|nagpapadala ng mensahe.|보내다|to send|magpadala|메시지를 = 메시지 + 를; 보내요 = 보내다 + polite form",
        "한국어 단어를 외워요.|memorize Korean words.|nagsasaulo ng Korean words.|외우다|to memorize|magsaulo|한국어 단어를 = Korean words + 를; 외워요 = 외우다 + polite form",
        "문장을 써요.|write a sentence.|nagsusulat ng pangungusap.|쓰다|to write|magsulat|문장을 = 문장 + 을; 써요 = 쓰다 + polite form",
        "한국어로 말해요.|speak in Korean.|nagsasalita sa Korean.|말하다|to speak|magsalita|한국어로 = Korean + 로; 말해요 = 말하다 + 해요",
        "질문을 해요.|ask a question.|nagtatanong.|질문하다|to ask a question|magtanong|질문을 = 질문 + 을; 해요 = 하다 + 해요",
        "대답해요.|answer.|sumasagot.|대답하다|to answer|sumagot|대답해요 = 대답하다 + polite 해요",
        "문법을 복습해요.|review grammar.|nagre-review ng grammar.|복습하다|to review|mag-review|문법을 = 문법 + 을; 복습해요 = 복습하다 + 해요",
        "숙제를 해요.|do homework.|gumagawa ng homework.|숙제하다|to do homework|gumawa ng homework|숙제를 = 숙제 + 를; 해요 = 하다 + 해요",
        "일해요.|work.|nagtatrabaho.|일하다|to work|magtrabaho|일해요 = 일하다 + polite 해요",
        "요리해요.|cook.|nagluluto.|요리하다|to cook|magluto|요리해요 = 요리하다 + polite 해요",
        "청소해요.|clean.|naglilinis.|청소하다|to clean|maglinis|청소해요 = 청소하다 + polite 해요",
        "빨래해요.|do the laundry.|naglalaba.|빨래하다|to do laundry|maglaba|빨래해요 = 빨래하다 + polite 해요",
        "쇼핑해요.|go shopping.|namimili.|쇼핑하다|to shop|mamili|쇼핑해요 = 쇼핑하다 + polite 해요",
        "뉴스를 봐요.|watch the news.|nanonood ng balita.|보다|to watch|manood|뉴스를 = 뉴스 + 를; 봐요 = 보다 + polite form",
        "영화를 봐요.|watch a movie.|nanonood ng pelikula.|보다|to watch|manood|영화를 = 영화 + 를; 봐요 = 보다 + polite form",
        "사진을 찍어요.|take a photo.|kumukuha ng litrato.|찍다|to take a photo|kumuha ng litrato|사진을 = 사진 + 을; 찍어요 = 찍다 + polite form",
        "커피를 마셔요.|drink coffee.|umiinom ng kape.|마시다|to drink|uminom|커피를 = 커피 + 를; 마셔요 = 마시다 + polite form",
        "버스를 타요.|take the bus.|sumasakay ng bus.|타다|to ride/take|sumakay|버스를 = 버스 + 를; 타요 = 타다 + polite form",
        "지하철을 타요.|take the subway.|sumasakay ng subway.|타다|to ride/take|sumakay|지하철을 = 지하철 + 을; 타요 = 타다 + polite form",
        "회사에 가요.|go to work.|pumupunta sa trabaho.|가다|to go|pumunta|회사에 = 회사 + 에; 가요 = 가다 + polite form",
        "학교에 가요.|go to school.|pumupunta sa paaralan.|가다|to go|pumunta|학교에 = 학교 + 에; 가요 = 가다 + polite form",
        "집에 와요.|come home.|umuuwi sa bahay.|오다|to come|umuwi|집에 = 집 + 에; 와요 = 오다 + polite form",
        "일찍 자요.|sleep early.|natutulog nang maaga.|자다|to sleep|matulog|일찍 = early; 자요 = 자다 + polite form",
        "아침을 먹어요.|eat breakfast.|kumakain ng almusal.|먹다|to eat|kumain|아침을 = 아침 + 을; 먹어요 = 먹다 + polite form",
        "저녁을 먹어요.|eat dinner.|kumakain ng hapunan.|먹다|to eat|kumain|저녁을 = 저녁 + 을; 먹어요 = 먹다 + polite form",
        "한국어 수업을 들어요.|attend a Korean class.|dumadalo sa Korean class.|수업을 듣다|to attend a class|dumalo sa klase|한국어 수업을 = Korean class + 을; 들어요 = 듣다 + polite form",
        "발음을 연습해요.|practice pronunciation.|nagpa-practice ng pronunciation.|연습하다|to practice|mag-practice|발음을 = 발음 + 을; 연습해요 = 연습하다 + 해요",
        "듣기 연습을 해요.|practice listening.|nagpa-practice ng listening.|듣기|listening|pakikinig|듣기 연습을 = listening practice + 을; 해요 = 하다 + 해요",
        "읽기 연습을 해요.|practice reading.|nagpa-practice ng reading.|읽기|reading|pagbabasa|읽기 연습을 = reading practice + 을; 해요 = 하다 + 해요",
        "문제를 풀어요.|solve a problem.|sumasagot ng problema o tanong.|풀다|to solve|lutasin|문제를 = 문제 + 를; 풀어요 = 풀다 + polite form",
        "사전을 찾아봐요.|look it up in a dictionary.|naghahanap sa diksyunaryo.|찾아보다|to look up|hanapin|사전을 = 사전 + 을; 찾아봐요 = 찾아보다 + polite form",
        "새 표현을 배워요.|learn a new expression.|natututo ng bagong expression.|배우다|to learn|matuto|새 표현을 = new expression + 을; 배워요 = 배우다 + polite form",
        "문장을 분석해요.|analyze a sentence.|nag-aanalyze ng pangungusap.|분석하다|to analyze|mag-analyze|문장을 = 문장 + 을; 분석해요 = 분석하다 + 해요"
    };

    static CardData card(int id){
        int safe=((id%10000)+10000)%10000, pi=safe%40, ctx=safe/40;
        int si=ctx%5, ti=(ctx/5)%5, fi=(ctx/25)%10;
        CardData b=new CardData(RAW[pi].split("\\|",-1));
        String[] s=SUBJECTS[si],t=TIMES[ti],f=FREQ[fi];
        CardData out=new CardData(new String[]{"","","",b.fkr,b.fen,b.ftl,b.detail});
        out.kr=s[0]+" "+t[0]+" "+f[0]+" "+b.kr;
        out.en=s[1]+" "+t[1]+" "+f[1]+" "+b.en;
        out.tl=s[2]+" "+t[2]+" "+f[2]+" "+b.tl;
        out.detail=s[3]+"\n"+t[0]+" = "+t[1]+" / "+t[2]+"\n"+f[0]+" = "+f[1]+" / "+f[2]+"\n"+b.detail;
        return out;
    }

    public static class ScreenMonitorService extends Service {
        static final String CH="kls_active"; long last=0;
        final BroadcastReceiver rx=new BroadcastReceiver(){@Override public void onReceive(Context c,Intent i){if(Intent.ACTION_SCREEN_ON.equals(i.getAction()))showIfLocked();}};
        @Override public void onCreate(){super.onCreate(); createCh(); Notification n=note(); if(Build.VERSION.SDK_INT>=34)startForeground(3107,n,ServiceInfo.FOREGROUND_SERVICE_TYPE_SPECIAL_USE);else startForeground(3107,n);
            IntentFilter f=new IntentFilter();f.addAction(Intent.ACTION_SCREEN_ON);f.addAction(Intent.ACTION_SCREEN_OFF);
            if(Build.VERSION.SDK_INT>=33)registerReceiver(rx,f,Context.RECEIVER_NOT_EXPORTED);else registerReceiver(rx,f);
        }
        @Override public int onStartCommand(Intent i,int flags,int id){if(!Deck.enabled(this)){stopSelf();return START_NOT_STICKY;}return START_STICKY;}
        void showIfLocked(){if(!Deck.enabled(this))return;long now=System.currentTimeMillis();if(now-last<1800)return;KeyguardManager k=(KeyguardManager)getSystemService(KEYGUARD_SERVICE);if(k==null||!k.isKeyguardLocked())return;last=now;
            Intent i=new Intent(this,StudyLockActivity.class);i.putExtra("ids",Deck.next(this));i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK|Intent.FLAG_ACTIVITY_CLEAR_TOP|Intent.FLAG_ACTIVITY_SINGLE_TOP|Intent.FLAG_ACTIVITY_EXCLUDE_FROM_RECENTS|Intent.FLAG_ACTIVITY_NO_ANIMATION);try{startActivity(i);}catch(Exception ignored){}}
        void createCh(){if(Build.VERSION.SDK_INT>=26){NotificationChannel c=new NotificationChannel(CH,"Korean Lock Study",NotificationManager.IMPORTANCE_LOW);c.setDescription("Keeps lock-screen study trigger active.");getSystemService(NotificationManager.class).createNotificationChannel(c);}}
        Notification note(){Intent o=new Intent(this,MainActivity.class);PendingIntent p=PendingIntent.getActivity(this,0,o,PendingIntent.FLAG_UPDATE_CURRENT|PendingIntent.FLAG_IMMUTABLE);Notification.Builder b=Build.VERSION.SDK_INT>=26?new Notification.Builder(this,CH):new Notification.Builder(this);return b.setContentTitle("Korean Lock Study is active").setContentText("5 new cards appear when the locked screen wakes.").setSmallIcon(android.R.drawable.ic_lock_idle_lock).setOngoing(true).setContentIntent(p).build();}
        @Override public void onDestroy(){try{unregisterReceiver(rx);}catch(Exception ignored){}super.onDestroy();}
        @Override public IBinder onBind(Intent i){return null;}
    }

    public static class BootReceiver extends BroadcastReceiver {
        @Override public void onReceive(Context c,Intent i){if(!Deck.enabled(c))return;try{Intent s=new Intent(c,ScreenMonitorService.class);if(Build.VERSION.SDK_INT>=26)c.startForegroundService(s);else c.startService(s);}catch(Exception ignored){}}
    }

    public static class StudyLockActivity extends Activity {
        boolean preview=false;
        final BroadcastReceiver unlock=new BroadcastReceiver(){@Override public void onReceive(Context c,Intent i){if(Intent.ACTION_USER_PRESENT.equals(i.getAction())&&!preview)finish();}};
        @Override public void onCreate(Bundle b){super.onCreate(b);preview=getIntent().getBooleanExtra("preview",false);if(Build.VERSION.SDK_INT>=27)setShowWhenLocked(true);else getWindow().addFlags(WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED);getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);getWindow().setStatusBarColor(BG);getWindow().setNavigationBarColor(BG);
            IntentFilter f=new IntentFilter(Intent.ACTION_USER_PRESENT);if(Build.VERSION.SDK_INT>=33)registerReceiver(unlock,f,Context.RECEIVER_NOT_EXPORTED);else registerReceiver(unlock,f);render(ids(getIntent()));}
        @Override protected void onNewIntent(Intent i){super.onNewIntent(i);setIntent(i);preview=i.getBooleanExtra("preview",false);render(ids(i));}
        int[] ids(Intent i){int[] x=i.getIntArrayExtra("ids");return x==null||x.length!=5?Deck.preview():x;}
        void render(int[] ids){
            ScrollView s=new ScrollView(this);s.setFillViewport(true);s.setBackgroundColor(BG);LinearLayout r=new LinearLayout(this);r.setOrientation(LinearLayout.VERTICAL);r.setPadding(dp2(16),dp2(18),dp2(16),dp2(24));s.addView(r);
            r.addView(t("KOREAN LOCK STUDY",13,ACC,true));TextView h=t("5 ITEMS • TAP A CARD TO ANALYZE",21,TXT,true);h.setPadding(0,dp2(5),0,dp2(4));r.addView(h);
            TextView prog=t(preview?"Preview mode":("Deck "+Deck.pos(this)+" / 10,000 • Cycle "+Deck.cycle(this)),13,SUB,false);prog.setPadding(0,0,0,dp2(12));r.addView(prog);
            for(int n=0;n<5;n++){r.addView(cardView(card(ids[n]),n+1));View g=new View(this);r.addView(g,new LinearLayout.LayoutParams(1,dp2(9)));}
            Button b=new Button(this);b.setText(preview?"CLOSE PREVIEW":"CONTINUE TO PHONE");b.setTextColor(TXT);b.setTextSize(15);b.setTypeface(Typeface.DEFAULT,Typeface.BOLD);b.setAllCaps(false);b.setBackgroundColor(ACC);b.setOnClickListener(v->finish());r.addView(b,new LinearLayout.LayoutParams(-1,-2));
            TextView safe=t("Normal Android PIN / fingerprint remains underneath.",12,SUB,false);safe.setGravity(Gravity.CENTER);safe.setPadding(0,dp2(8),0,0);r.addView(safe);setContentView(s);
        }
        View cardView(CardData d,int n){
            LinearLayout b=new LinearLayout(this);b.setOrientation(LinearLayout.VERTICAL);b.setPadding(dp2(14),dp2(12),dp2(14),dp2(12));b.setBackgroundColor(CARD);
            b.addView(t(String.format(Locale.US,"%02d • VOCAB %s",n,d.fkr),12,OK,true));TextView kr=t(d.kr,21,TXT,true);kr.setPadding(0,dp2(5),0,dp2(5));b.addView(kr);b.addView(t(d.en,14,SUB,false));TextView tl=t(d.tl,14,SUB,false);tl.setPadding(0,dp2(2),0,dp2(7));b.addView(tl);
            TextView focus=t(d.fkr+" • "+d.fen+" • "+d.ftl,13,ACC,true);focus.setPadding(0,0,0,dp2(7));b.addView(focus);
            TextView a=t("SENTENCE ANALYZER\n• "+d.detail.replace("\n","\n• ")+"\n• Ending: -아요 / -어요 / -해요 polite style",13,TXT,false);a.setPadding(dp2(10),dp2(10),dp2(10),dp2(10));a.setBackgroundColor(CARD2);a.setVisibility(View.GONE);b.addView(a,new LinearLayout.LayoutParams(-1,-2));
            b.addView(t("Tap to show / hide analyzer",12,SUB,true));b.setOnClickListener(v->a.setVisibility(a.getVisibility()==View.VISIBLE?View.GONE:View.VISIBLE));return b;
        }
        TextView t(String x,int sp,int c,boolean bold){TextView v=new TextView(this);v.setText(x);v.setTextSize(sp);v.setTextColor(c);if(bold)v.setTypeface(Typeface.DEFAULT,Typeface.BOLD);return v;}
        int dp2(int x){return Math.round(x*getResources().getDisplayMetrics().density);}
        @Override public void onDestroy(){try{unregisterReceiver(unlock);}catch(Exception ignored){}super.onDestroy();}
    }
}
