#!/usr/bin/env bash
set +e
OUT="$(pwd)/korean-lock-build/apk-output"
mkdir -p "$OUT"
{
  echo "=== SYSTEM ==="
  date
  uname -a
  whoami
  pwd
  echo
  echo "=== TOOLS ==="
  command -v java; java -version
  command -v dnf; dnf --version | head
  command -v curl; curl --version | head
  command -v unzip; unzip -v | head -2
  echo
  echo "=== JAVA 17 PACKAGE ==="
  dnf list java-17-amazon-corretto-headless
  echo
  echo "=== TRY INSTALL JAVA17 ==="
  dnf install -y java-17-amazon-corretto-headless
  echo "install_exit=$?"
  command -v java; java -version
  echo
  echo "=== NETWORK GOOGLE ==="
  curl -IL --max-time 20 "https://dl.google.com/android/repository/commandlinetools-linux-15859902_latest.zip" | head -30
  echo "google_exit=$?"
  echo
  echo "=== NETWORK GRADLE ==="
  curl -IL --max-time 20 "https://services.gradle.org/distributions/gradle-8.11.1-bin.zip" | head -30
  echo "gradle_exit=$?"
} > "$OUT/debug.txt" 2>&1

cat > "$OUT/index.html" <<'HTML'
<!doctype html><html><body style="font-family:Arial;padding:30px"><h1>APK Build Diagnostic</h1><p><a href="/debug.txt">Open debug.txt</a></p></body></html>
HTML
exit 0
