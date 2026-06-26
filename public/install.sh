#!/bin/sh
set -eu

repo="${HOOKTAP_REPO:-HookTap/hooktap-cli}"
version="${HOOKTAP_VERSION:-latest}"
bindir="${BINDIR:-}"

need() {
  command -v "$1" >/dev/null 2>&1 || {
    echo "hooktap installer: missing required command: $1" >&2
    exit 1
  }
}

need curl
need tar

os="$(uname -s | tr '[:upper:]' '[:lower:]')"
arch="$(uname -m)"

case "$os" in
  darwin|linux) ;;
  *) echo "hooktap installer: unsupported OS: $os" >&2; exit 1 ;;
esac

case "$arch" in
  x86_64|amd64) arch="amd64" ;;
  arm64|aarch64) arch="arm64" ;;
  *) echo "hooktap installer: unsupported architecture: $arch" >&2; exit 1 ;;
esac

if [ "$version" = "latest" ]; then
  version="$(curl -fsSL "https://api.github.com/repos/$repo/releases/latest" | sed -n 's/.*"tag_name"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' | head -n 1)"
fi

if [ -z "$version" ]; then
  echo "hooktap installer: could not determine latest release" >&2
  exit 1
fi

tag="$version"
archive_version="${version#v}"
archive="hooktap_${archive_version}_${os}_${arch}.tar.gz"
url="https://github.com/$repo/releases/download/$tag/$archive"

if [ -z "$bindir" ]; then
  if [ -d /usr/local/bin ] && [ -w /usr/local/bin ]; then
    bindir="/usr/local/bin"
  else
    bindir="$HOME/.local/bin"
  fi
fi

mkdir -p "$bindir"
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT INT TERM

echo "Downloading hooktap $tag for $os/$arch..."
curl -fsSL "$url" -o "$tmp/$archive"
tar -xzf "$tmp/$archive" -C "$tmp"

install -m 0755 "$tmp/hooktap" "$bindir/hooktap"

echo "Installed hooktap to $bindir/hooktap"
if ! command -v hooktap >/dev/null 2>&1; then
  echo "Add this to your shell profile if needed:" >&2
  echo "  export PATH=\"$bindir:\$PATH\"" >&2
fi
echo "Run: hooktap setup"
