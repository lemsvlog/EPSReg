#!/usr/bin/env bash
set +e

ROOT="$(pwd)"
OUT="$ROOT/korean-lock-build/apk-output"
LOG="$OUT/build.log"
mkdir -p "$OUT"
rm -f "$OUT/KoreanLockStudy.apk" "$LOG"

(
  set -euo pipefail

  echo "== SYSTEM =="
  date
  uname -a
  pwd

  echo "== JAVA 17 =="
  dnf install -y java-17-amazon-corretto-headless
  JAVA_BIN="$(find /usr/lib/jvm -type f -path '*17*/bin/java' 2>/dev/null | head -1)"
  if [ -z "$JAVA_BIN" ]; then
    JAVA_BIN="$(rpm -ql java-17-amazon-corretto-headless | grep '/bin/java$' | head -1)"
  fi
  export JAVA_HOME="$(dirname "$(dirname "$JAVA_BIN")")"
  export PATH="$JAVA_HOME/bin:$PATH"
  echo "JAVA_HOME=$JAVA_HOME"
  java -version

  SDK="$ROOT/.android-sdk"
  GRADLE_ROOT="$ROOT/.gradle-bin"
  GRADLE_HOME="$GRADLE_ROOT/gradle-8.11.1"
  mkdir -p "$SDK/cmdline-tools" "$GRADLE_ROOT"

  echo "== ANDROID COMMAND LINE TOOLS =="
  curl -fL --retry 3 --connect-timeout 30     -o /tmp/cmdline.zip     "https://dl.google.com/android/repository/commandlinetools-linux-15859902_latest.zip"
  ls -lh /tmp/cmdline.zip
  rm -rf /tmp/cmdline-unzip "$SDK/cmdline-tools/latest"
  mkdir -p /tmp/cmdline-unzip
  unzip -q /tmp/cmdline.zip -d /tmp/cmdline-unzip
  mv /tmp/cmdline-unzip/cmdline-tools "$SDK/cmdline-tools/latest"

  export ANDROID_HOME="$SDK"
  export ANDROID_SDK_ROOT="$SDK"
  export PATH="$SDK/cmdline-tools/latest/bin:$SDK/platform-tools:$PATH"

  echo "== SDKMANAGER =="
  sdkmanager --version
  yes | sdkmanager --licenses >/dev/null 2>&1 || true
  sdkmanager "platforms;android-35" "build-tools;35.0.0" "platform-tools"

  echo "== GRADLE 8.11.1 =="
  curl -fL --retry 3 --connect-timeout 30     -o /tmp/gradle.zip     "https://services.gradle.org/distributions/gradle-8.11.1-bin.zip"
  ls -lh /tmp/gradle.zip
  rm -rf "$GRADLE_HOME"
  unzip -q /tmp/gradle.zip -d "$GRADLE_ROOT"
  export PATH="$GRADLE_HOME/bin:$PATH"
  gradle --version

  echo "== ANDROID BUILD =="
  gradle -p korean-lock-build :app:assembleDebug --stacktrace --no-daemon

  echo "== APK OUTPUT =="
  test -f "$ROOT/korean-lock-build/app/build/outputs/apk/debug/app-debug.apk"
  cp "$ROOT/korean-lock-build/app/build/outputs/apk/debug/app-debug.apk" "$OUT/KoreanLockStudy.apk"
  ls -lh "$OUT/KoreanLockStudy.apk"
) >"$LOG" 2>&1

STATUS=$?
echo >>"$LOG"
echo "FINAL_BUILD_STATUS=$STATUS" >>"$LOG"

if [ -f "$OUT/KoreanLockStudy.apk" ]; then
  RESULT="<p style='font-size:22px'><a href='/KoreanLockStudy.apk'>Download KoreanLockStudy.apk</a></p><p>APK BUILD SUCCESS</p>"
else
  RESULT="<p>APK BUILD FAILED — open the build log below.</p>"
fi

cat >"$OUT/index.html" <<HTML
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Korean Lock Study Build</title>
</head>
<body style="font-family:Arial,sans-serif;max-width:760px;margin:50px auto;padding:20px">
<h1>Korean Lock Study</h1>
$RESULT
<p><a href="/build.log">Open build.log</a></p>
</body>
</html>
HTML

# Intentionally return success so Vercel publishes the APK or diagnostic log.
exit 0
