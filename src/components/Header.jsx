import style from '../assets/styles/header.module.css';
import { useAuth } from '../hooks/useAuth';
import { Logo } from './Logo';

export function Header() {
  const { user, removeToken } = useAuth();
  return (
    <header className={style.header}>
      <Logo></Logo>
      <div className={style['user-section']}>
        {user ? (
          <>
            <span className={style['user-tag']}>{user.nombre_usuario}</span>
            <button
              className={style['logout-button']}
              onClick={() => removeToken()}
            >
              Cerrar sesion
            </button>
          </>
        ) : (
          <>
            <button className={style['signup-button']}>
              <a href="/registro">Registrarse</a>
            </button>
            <button className={style['login-button']}>
              <a href="/login">Iniciar sesion</a>
            </button>
          </>
        )}
      </div>
    </header>
  );
}
