import logo from '../assets/images/logo.svg';
import style from '../assets/styles/logo.module.css';

export function Logo() {
  return (
    <a className={style.logo} href="/">
      <img src={logo}></img>
    </a>
  );
}
