# Better Auth Integration

## What I implemented
- Added `better-auth` dependency and a small wrapper at `lib/better-auth.mjs`.
- Added a catch-all route `app/api/auth/[...all]/route.ts` that delegates to Better Auth's handler when `BETTER_AUTH_SECRET` is set.
- Updated `app/api/auth/register` and `app/api/auth/login` to proxy to Better Auth's `signUpEmail` / `signInEmail` routes when `BETTER_AUTH_SECRET` is present, otherwise use local fallback.
- Client pages (`/login`, `/register`) still call `/api/auth/login` and `/api/auth/register` so they work with both Better Auth and local fallback.

## Notes
- Better Auth expects some configuration; the wrapper uses `BETTER_AUTH_SECRET` and optional `BETTER_AUTH_URL` from env.
- The proxying is implemented by server-side fetch to internal `/api/auth/signUpEmail` and `/api/auth/signInEmail` which are handled by the catch-all route.
- Better Auth may set cookies; depending on desired session model you might want to handle cookies vs token storage on client. Currently we proxy JSON response through and keep the existing local token workflow as fallback.

## Next steps / TODOs
- Ensure cookie handling is correct for production (Vercel) — might need to forward Set-Cookie headers to client.
- Optionally replace local token usage with Better Auth session cookies or integrate with `better-auth/tanstack-start` for React cookie helpers.
- Add tests and e2e flows for signUp/signIn with Better Auth.
