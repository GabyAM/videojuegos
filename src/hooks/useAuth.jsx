import { useContext } from 'react';
import { AuthContext } from '../context/auth/context';

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("Can't use context outside of scope");
  }

  return context;
}
