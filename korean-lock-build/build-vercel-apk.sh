#!/usr/bin/env bash
set -euo pipefail

echo "== Installing Java 17 and utilities =="
dnf install -y java-17-amazon-corretto-headless >/dev/null

JAVA_BIN="$(rpm -ql java-17-amazon-corretto-headless | grep '/bin/java$' | head -1)"
export JAVA_HOME="$(dirname "$(dirname "$JAVA_BIN")")"
export PATH="$JAVA_HOME/bin:$PATH"
java -version

ROOT="$(pwd)"
SDK="$ROOT/.android-sdk"
GRADLE_HOME="$ROOT/.gradle-bin/gradle-8.11.1"
mkdir -p "$SDK/cmdline-tools" "$ROOT/.gradle-bin"

echo "== Downloading Android command line tools =="
curl -fL --retry 3 -o /tmp/cmdline.zip "https://dl.google.com/android/repository/commandlinetools-linux-15859902_latest.zip"
rm -rf /tmp/cmdline-unzip
mkdir -p /tmp/cmdline-unzip
unzip -q /tmp/cmdline.zip -d /tmp/cmdline-unzip
rm -rf "$SDK/cmdline-tools/latest"
mv /tmp/cmdline-unzip/cmdline-tools "$SDK/cmdline-tools/latest"

export ANDROID_HOME="$SDK"
export ANDROID_SDK_ROOT="$SDK"
export PATH="$SDK/cmdline-tools/latest/bin:$SDK/platform-tools:$PATH"

echo "== Installing Android SDK 35 =="
yes | sdkmanager --licenses >/dev/null 2>&1 || true
sdkmanager "platforms;android-35" "build-tools;35.0.0" "platform-tools"

echo "== Downloading Gradle =="
curl -fL --retry 3 -o /tmp/gradle.zip "https://services.gradle.org/distributions/gradle-8.11.1-bin.zip"
rm -rf "$GRADLE_HOME"
unzip -q /tmp/gradle.zip -d "$ROOT/.gradle-bin"
export PATH="$GRADLE_HOME/bin:$PATH"

echo "== Building APK =="
gradle -p korean-lock-build :app:assembleDebug --stacktrace

OUT="$ROOT/korean-lock-build/apk-output"
mkdir -p "$OUT"
cp "$ROOT/korean-lock-build/app/build/outputs/apk/debug/app-debug.apk" "$OUT/KoreanLockStudy.apk"
cat > "$OUT/index.html" <<'HTML'
<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Korean Lock Study APK</title></head>
<body style="font-family:Arial,sans-serif;max-width:680px;margin:60px auto;padding:20px">
<h1>Korean Lock Study</h1>
<p>Android APK build.</p>
<p><a href="/KoreanLockStudy.apk" style="font-size:22px">Download KoreanLockStudy.apk</a></p>
</body></html>
HTML

ls -lh "$OUT/KoreanLockStudy.apk"
