import { useNavigate } from 'react-router-dom';
import { AuthForm } from '../components/AuthForm';
import { useAuth } from '../hooks/useAuth';
import { AuthScreen } from '../components/AuthScreen';

function login(data) {
  return fetch('http://localhost/login', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  }).then((res) => {
    if (!res.ok && res.status !== 400) {
      throw new Error('Error al iniciar sesion');
    }
    return res.json();
  });
}

export function Login() {
  const { updateToken, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onLogin = ({ token }) => {
    updateToken(token);
    navigate('/');
  };

  if (isAuthenticated) navigate('/');

  return (
    <>
      <AuthScreen>
        <AuthForm
          label="Iniciar sesión"
          onSubmit={login}
          onSuccess={onLogin}
        ></AuthForm>
      </AuthScreen>
    </>
  );
}
