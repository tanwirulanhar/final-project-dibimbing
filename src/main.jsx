import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import HomePage from './Pages/HomePage/HomePage.jsx';
import LoginPage from './Pages/Login/LoginPage.jsx';
import RegisterPage from './Pages/Register/RegisterPage.jsx';
import Testing from './Pages/Testing.js/Testing.jsx';
import Banner from './Component/Banner.jsx';
import HomePageLogin from './Pages/HomePage/HomePageLogin.jsx';
import HomePageAdmin from './Pages/HomePage/HomePageAdmin.jsx';
import CardUser from './Component/Fragments/DashboardCardUser/CardUser.jsx';
import DashboardPromo from './Component/Fragments/DashboardPromo/DashboardPromo.jsx';
import DashboardBanner from './Component/Fragments/DashboardBanner/DashboardBanner.jsx';
import DashboardCategory from './Component/Fragments/DashboardCategory/DashboardCategory.jsx';
import DashboardActivity from './Component/Fragments/DashboardActivity/DashboardActivity.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/testing',
    element: <Testing />,
  },
  {
    path: '/banner',
    element: <Banner />,
  },
  {
    path: '/homeLogin',
    element: <HomePageLogin />,
  },
  {
    path: '/homepageadmin',
    element: <HomePageAdmin />,
    children: [
      {
        path: 'alluser',
        element: <CardUser />,
      },
      {
        path: 'promo',
        element: <DashboardPromo/>
      },
      {
        path: 'banner',
        element: <DashboardBanner/>
      },
      {
        path: 'category',
        element: <DashboardCategory/>
      },
      {
        path: 'activity',
        element: <DashboardActivity/>
      }
     
    ],
  },
  {
    path: '/carduser',
    element: <CardUser />,
  }
  
]);

// Render the app with RouterProvider
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
