'use client';

import { useAuth } from '../../context/AuthContext';

export default function ProtectedPage() {
  const { keycloak, authenticated } = useAuth();

  if (!authenticated) return <p>Loading...</p>;

  return (
    <div>
      <h1>Protected Page</h1>
      <p>Welcome, {keycloak.tokenParsed?.preferred_username}</p>
      <button onClick={() => keycloak.logout()}>Logout</button>
    </div>
  );
}
