import { betterAuth } from 'better-auth';

const secret = process.env.BETTER_AUTH_SECRET;
const baseUrl = process.env.BETTER_AUTH_URL;

if (!secret) {
  console.warn('BETTER_AUTH_SECRET is not set. Better Auth will be disabled.');
}

export const auth = betterAuth({
  secret: secret ?? undefined,
  baseUrl: baseUrl ?? undefined,
});

export async function handler(request) {
  // better-auth exposes handler on the returned object
  if (!auth || !auth.handler) {
    return new Response(JSON.stringify({ error: 'better-auth not configured' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
  return auth.handler(request);
}
