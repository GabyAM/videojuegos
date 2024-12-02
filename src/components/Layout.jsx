import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import style from '../assets/styles/layout.module.css';
import { Footer } from './Footer';
import { NavBar } from './NavBar';

export function Layout() {
  return (
    <>
      <Header></Header>
      <div className={style.container}>
        <NavBar></NavBar>
        <main>
          <Outlet></Outlet>
        </main>
      </div>
      <Footer></Footer>
    </>
  );
}
