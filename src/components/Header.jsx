import style from '../assets/styles/header.module.css';
import { useAuth } from '../hooks/useAuth';

export function Header() {
  const { user, removeToken } = useAuth();
  return (
    <header className={style.header}>
      <h1>Jueguitos</h1>
      {user ? (
        <div>
          <span>{user.nombre_usuario}</span>
          <button onClick={() => removeToken()}>Cerrar sesion</button>
        </div>
      ) : (
        <div>
          <button>Registrarse</button>
          <button>
            <a href="/login">Iniciar sesion</a>
          </button>
        </div>
      )}
    </header>
  );
}
