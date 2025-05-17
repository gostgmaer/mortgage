'use client';

export default function LoginPage() {
  const login = () => {
    const redirectUri = encodeURIComponent('http://localhost:4200/api/callback');
    const authUrl = `https://infin8v2-ss-layer.inadev.net/client-keycloak/auth/realms/infin8v2dev/protocol/openid-connect/auth?client_id=infin8v2DevWeb&response_type=code&redirect_uri=${redirectUri}`;
    window.location.href = authUrl;
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={login}>Login with Keycloak</button>
    </div>
  );
}
