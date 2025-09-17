
# TaskVault (clean tasks + solutions)

A minimal **Next.js + Supabase + Tailwind** app where **admin** adds tasks (statement, solution, official code, tests) and a single **reader** account can view them. Clean, elegant UI.

## 1) Setup Supabase

1. Create project → get `URL` and `anon key`.
2. SQL Editor → paste `sql/schema.sql`.
3. Auth → Add 2 users:
   - admin (email/password)
   - reader (email/password)
4. SQL:
   ```sql
   insert into app_users (user_id, role) values
   ('<ADMIN_USER_ID>', 'admin'),
   ('<READER_USER_ID>', 'reader');
   ```

## 2) Local dev

```bash
npm i
cp .env.example .env.local
# fill values
npm run dev
```

Open http://localhost:3000

## 3) Env

See `.env.example`

## 4) Deploy

- Vercel works out-of-the-box. Set env vars there.
- Recommended: restrict Dashboard via RLS (already done) + hide link if user is not admin.
