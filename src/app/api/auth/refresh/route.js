import { cookies } from 'next/headers';

export async function GET(request) {
  const cookieStore = await cookies();
  const refresh_token = cookieStore.get('refresh_token')?.value;

  if (!refresh_token) {
    return new Response(JSON.stringify({ error: 'No refresh token found' }), {
      status: 401,
    });
  }

  const params = new URLSearchParams();
  params.append('grant_type', 'refresh_token');
  params.append('client_id', 'your-client-id');
  params.append('refresh_token', refresh_token);
  // If your client is confidential:
  // params.append('client_secret', 'your-client-secret');

  try {
    const res = await fetch('https://your-keycloak-domain/realms/your-realm/protocol/openid-connect/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params,
    });

    if (!res.ok) {
      return new Response(JSON.stringify({ error: 'Failed to refresh token' }), {
        status: 401,
      });
    }

    const data = await res.json();
    const { access_token, refresh_token: new_refresh_token, id_token } = data;

    cookieStore.set('access_token', access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
    });

    if (new_refresh_token) {
      cookieStore.set('refresh_token', new_refresh_token, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
      });
    }

    if (id_token) {
      cookieStore.set('id_token', id_token, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
      });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
    });
  }
}
