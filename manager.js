// simple example using PG or Supabase client - pseudocode
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

async function getActiveHmacKey() {
  // table api_keys columns: id, key, active, created_at
  const { data } = await supabase.from('api_keys').select('*').eq('active', true).limit(1).single();
  return data ? data.key : process.env.TEST_HMAC_KEY;
}

async function rotateKey(newKey) {
  // deactivate old keys, insert new, mark active
  await supabase.from('api_keys').update({ active: false }).neq('active', false);
  await supabase.from('api_keys').insert([{ key: newKey, active: true }]);
  return true;
}

module.exports = { getActiveHmacKey, rotateKey };
