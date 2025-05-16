import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './views/routes/Home';
import Login from './views/routes/Login';
import Register from './views/routes/Register';
import UserDashBoard from './views/routes/UserDashBoard';
import AdminDashBoard from './views/routes/AdminDashBoard';
import ProtectedRoutes from './views/routes/ProtectedRoutes';
import './index.css';
import AdminCrud from './views/routes/adminCrud';
import { UserProvider } from './views/providers/UserProvider';
import Perfil from './views/services/Perfil';
import Citas from './views/services/Citas';
import FeedBack from './views/services/FeedBack';
// import Test2 from './views/tests/test2';



const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {path: '/register',
    element: <Register />,
  },
  {
    path: '/',
    element: <ProtectedRoutes />,
    children: [
      {
      path: '/userDashBoard',
      element: <UserDashBoard />,
      },
      {
        path: '/adminDashBoard',
        element: <AdminDashBoard />,
      },
      {
        path: '/adminCrud',
        element: <AdminCrud/>,
      },
    ]
  },
  {
    // Encuesta de satisfacción
    path: '/feedback',
    element: <FeedBack />,
  },
  { // Rutas de testeo
    path: '/perfil',
    element: <Perfil/>
  },
  {
    path: '/citas',
    element: <Citas/>
  },
  // {
  //   path: '/test',
  //   element: <Test/>
  // },
  // {
  //   path: '/test2',
  //   element: <Test2/>
  // },

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={ router }/>
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
