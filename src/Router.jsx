import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Games } from './pages/Games';
import { Login } from './pages/Login';
import { GameDetail } from './pages/GameDetail';
import { Signup } from './pages/Signup';
import { CreateGame } from './pages/CreateGame';

export function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout></Layout>,
      children: [
        { index: true, element: <Games></Games> },
        { path: '/juegos/:id', element: <GameDetail></GameDetail> },
        { path: '/juego/crear', element: <CreateGame></CreateGame> }
      ]
    },
    { path: '/login', element: <Login></Login> },
    { path: '/registro', element: <Signup></Signup> }
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}
