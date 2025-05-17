// 'use client';
// import { createContext, useEffect, useState } from 'react';
// import keycloak from '@/lib/keycloak';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [authenticated, setAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     keycloak.init({ onLoad: 'login-required' }).then((auth) => {
//       if (auth) {
//         setAuthenticated(true);
//         setUser(keycloak.tokenParsed);
//       }
//     });
//   }, []);

//   return (
//     <AuthContext.Provider value={{ authenticated, user, keycloak }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


// 'use client'

// import { createContext, useContext, useEffect, useState } from 'react'
// import keycloak from '../lib/keycloak'

// const AuthContext = createContext()

// export function AuthProvider({ children }) {
//   const [keycloakInstance, setKeycloakInstance] = useState(null)
//   const [authenticated, setAuthenticated] = useState(false)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     keycloak
//       .init({ onLoad: 'check-sso', silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html' })
//       .then((auth) => {
//         setKeycloakInstance(keycloak)
//         setAuthenticated(auth)
//         setLoading(false)
//       })
//       .catch(() => {
//         setLoading(false)
//       })
//   }, [])

//   const login = () => keycloak.login()
//   const logout = () => keycloak.logout()

//   return (
//     <AuthContext.Provider value={{ keycloak: keycloakInstance, authenticated, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export function useAuth() {
//   return useContext(AuthContext)
// }

// 'use client';

// import { createContext, useContext, useEffect, useState } from 'react';
// import keycloak from '../lib/keycloak';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [authenticated, setAuthenticated] = useState(false);

//   useEffect(() => {
//     keycloak.init({ onLoad: 'login-required' }).then((auth) => {
//       setAuthenticated(auth);

//       // ✅ Set up token refresh only after successful login
//       if (auth) {
//         const interval = setInterval(() => {
//           keycloak.updateToken(70).catch(() => {
//             keycloak.logout();
//           });
//         }, 6000);

//         // ✅ Clean up interval on unmount
//         return () => clearInterval(interval);
//       }
//     });
//   }, []);

//   return (
//     <AuthContext.Provider value={{ keycloak, authenticated }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);



'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import keycloak from '../lib/keycloak';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    keycloak.init({
      onLoad: 'login-required', // 👈 Forces login on first load
      pkceMethod: 'S256',
      redirectUri: window.location.origin,
    }).then((auth) => {
      setAuthenticated(auth);
      if (auth) {
        console.log('User is authenticated:', keycloak.tokenParsed);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ keycloak, authenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
