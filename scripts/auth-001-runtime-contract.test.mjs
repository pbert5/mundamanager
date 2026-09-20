import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (file) => readFile(new URL(`../${file}`, import.meta.url), 'utf8');

test('server-side Supabase URL selection has an internal-first fallback helper', async () => {
  const source = await read('utils/supabase/server-url.ts');
  assert.match(source, /MUNDA_SUPABASE_INTERNAL_URL\s*\|\|\s*process\.env\.NEXT_PUBLIC_SUPABASE_URL/);
});

test('proxy auth uses the internal-first URL selector without changing browser client behavior', async () => {
  const [proxy, browser] = await Promise.all([
    read('proxy.ts'),
    read('utils/supabase/client.ts'),
  ]);
  assert.match(proxy, /getSupabaseServerUrl/);
  assert.doesNotMatch(proxy, /createServerClient\(\s*process\.env\.NEXT_PUBLIC_SUPABASE_URL/);
  assert.match(browser, /process\.env\.NEXT_PUBLIC_SUPABASE_URL/);
});

test('server-side public loaders and Patreon routes use the internal-first selector', async () => {
  const files = [
    'app/contributors/page.tsx',
    'app/lib/get-stats-user.ts',
    'app/api/patreon/sync/route.ts',
    'app/api/patreon/webhook/route.ts',
  ];
  const sources = await Promise.all(files.map(read));
  for (const source of sources) {
    assert.match(source, /getSupabaseServerUrl|createServiceRoleClient/);
    assert.doesNotMatch(source, /createClient\(\s*process\.env\.NEXT_PUBLIC_SUPABASE_URL/);
  }
});

test('the shared server client and service-role client both use the selector', async () => {
  const source = await read('utils/supabase/server.ts');
  assert.match(source, /getSupabaseServerUrl/);
  assert.doesNotMatch(source, /MUNDA_SUPABASE_INTERNAL_URL\s*\|\|/);
});
