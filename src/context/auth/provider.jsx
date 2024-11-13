import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from './context';

async function decodeToken(token) {
  try {
    const jwt = await jwtDecode(token);
    return jwt;
  } catch (e) {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState({ encoded: null, decoded: null });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function initializeToken() {
      const token = localStorage.getItem('token');
      updateToken(token);
    }

    initializeToken();
  }, [setToken, setIsLoading]);

  async function updateToken(token) {
    setIsLoading(true);
    const decodedToken = await decodeToken(token);
    setToken({
      encoded: decodedToken ? token : null,
      decoded: decodedToken
    });
    localStorage.setItem('token', token);
    setIsLoading(false);
  }

  function removeToken() {
    localStorage.removeItem('token');
    setToken({ encoded: null, decoded: null });
    setIsLoading(false);
  }
  return (
    <AuthContext.Provider
      value={{
        user: token.decoded?.user,
        token: token.encoded,
        isAuthenticated: token.decoded !== null && !isLoading,
        updateToken,
        removeToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
