import { useNavigate } from 'react-router-dom';
import { AuthForm } from '../components/AuthForm';
import { useAuth } from '../hooks/useAuth';
import { AuthScreen } from '../components/AuthScreen';

function signup(data) {
  return fetch('http://localhost/register', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  }).then((res) => {
    if (!res.ok && res.status !== 400) {
      throw new Error('Error al registrarse');
    }
    return res.json();
  });
}

export function Signup() {
  const { updateToken, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSignup = ({ token }) => {
    updateToken(token);
    navigate('/');
  };

  if (isAuthenticated) navigate('/');

  return (
    <>
      <AuthScreen>
        <AuthForm
          label="Registrarse"
          onSubmit={signup}
          onSuccess={onSignup}
        ></AuthForm>
      </AuthScreen>
    </>
  );
}
