const supabase = require('@supabase/supabase-js').createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

async function log(actor_id, action, resource_type, resource_id, details = {}) {
  await supabase.from('audit_logs').insert([{
    actor_id,
    action,
    resource_type,
    resource_id,
    details: JSON.stringify(details),
    created_at: new Date().toISOString()
  }]);
}

module.exports = { log };
