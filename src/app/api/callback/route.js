import { cookies } from 'next/headers';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  const res = await fetch('http://localhost:4200/api/auth/token', {
    method: 'POST',
    body: JSON.stringify({ code }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) {
    return new Response(JSON.stringify({ error: 'Token exchange failed' }), {
      status: 500,
    });
  }

  const data = await res.json();
  const { access_token, refresh_token } = data;

  const cookieStore = cookies();

  cookieStore.set('access_token', access_token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
  });

  cookieStore.set('refresh_token', refresh_token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
  });

  // ✅ Redirect to dashboard after successful login
  return Response.redirect('http://localhost:4200/dashboard');
}
