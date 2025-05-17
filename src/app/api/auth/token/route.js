import axios from 'axios';

export async function POST(request) {
  const body = await request.json();

  try {
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', body.code);
    params.append('redirect_uri', 'http://localhost:4200/api/callback');
    params.append('client_id', process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID);
    params.append('client_secret', process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_SECRET);

    const response = await axios.post(
      'https://infin8v2-ss-layer.inadev.net/client-keycloak/auth/realms/infin8v2dev/protocol/openid-connect/token',
      params
    );

    return new Response(JSON.stringify(response.data), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
