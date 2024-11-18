import style from '../assets/styles/authscreen.module.css';
import { Logo } from './Logo';

export function AuthScreen({ children }) {
  return (
    <div className={style.screen}>
      <div className={style['logo-container']}>
        <Logo></Logo>
      </div>
      {children}
    </div>
  );
}
