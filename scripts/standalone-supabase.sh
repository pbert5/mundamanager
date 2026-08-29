#!/bin/sh
set -eu

cd /workspace

echo "Starting the local Supabase stack..."
supabase start

status_env="$(supabase status -o env)"
api_url="$(printf '%s\n' "$status_env" | awk -F= '$1 == "API_URL" {print substr($0, index($0, "=") + 1); exit}' | tr -d '\"')"
anon_key="$(printf '%s\n' "$status_env" | awk -F= '$1 == "ANON_KEY" {print substr($0, index($0, "=") + 1); exit}' | tr -d '\"')"

if [ -z "$api_url" ] || [ -z "$anon_key" ]; then
  echo "Could not read API_URL and ANON_KEY from 'supabase status -o env'." >&2
  exit 1
fi

umask 077
cat > .env.standalone <<EOF
NEXT_PUBLIC_SUPABASE_URL=$api_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=$anon_key
EOF

echo "Supabase is ready at $api_url."
