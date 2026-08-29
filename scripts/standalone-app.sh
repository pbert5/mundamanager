#!/usr/bin/env bash
set -Eeuo pipefail

cd /workspace

for attempt in {1..60}; do
  if [[ -s .env.standalone ]]; then
    break
  fi
  sleep 1
done

if [[ ! -s .env.standalone ]]; then
  echo "Timed out waiting for .env.standalone from the Supabase wrapper." >&2
  exit 1
fi

if [[ -f .env.local ]]; then
  set -a
  # shellcheck disable=SC1091
  source .env.local
  set +a
fi

set -a
# shellcheck disable=SC1091
source .env.standalone
set +a

exec npm run dev -- --hostname 0.0.0.0
