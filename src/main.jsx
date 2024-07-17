import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import HomePage from './Pages/HomePage/HomePage.jsx'
import LoginPage from './Pages/Login/LoginPage.jsx'
import RegisterPage from './Pages/Register/RegisterPage.jsx'
import Testing from './Pages/Testing.js/Testing.jsx'
import Banner from './Component/Banner.jsx'
import HomePageLogin from './Pages/HomePage/HomePageLogin.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage/>,
  },
  {
    path: '/login',
    element: <LoginPage/>
  },
  {
    path: '/register',
    element: <RegisterPage/>
  },
  {
    path: '/testing',
    element: <Testing/>
  },
  {
    path: '/banner',
    element: <Banner/>
  },
  {
    path: '/homeLogin',
    element: <HomePageLogin/>
  }
  
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
