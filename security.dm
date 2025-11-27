# Royal Mix Security README

This file documents the security stack for Royal Mix: JWT auth, HMAC signing, API key rotation, RLS (Supabase), audit logs, backups, monitoring.

## Steps for devs
1. Add secrets to env/GitHub Secrets:
   - JWT_SECRET
   - SUPABASE_SERVICE_KEY
   - SUPABASE_URL
   - HMAC_TEST_KEY
   - SENTRY_DSN
2. Start server: `npm run dev`
3. Run tests: `npm run test`
4. Rotate keys: use admin API or `scripts/rotate_keys.sh`
5. Audit logs are stored in `audit_logs` table

## Admin endpoints
- POST /api/admin/rotate-key
- POST /api/admin/backup-db
