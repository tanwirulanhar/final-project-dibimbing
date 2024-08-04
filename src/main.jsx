// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from "./redux/Store/store.js";
import "./index.css";
import HomePage from "./Pages/HomePage/HomePageUser/HomePage.jsx";
import LoginPage from "./Pages/Login/LoginPage.jsx";
import RegisterPage from "./Pages/Register/RegisterPage.jsx";
import Banner from "./Component/Banner.jsx";
import HomePageAdmin from "./Pages/HomePage/HomePageAdmin/HomePageAdmin.jsx";
import CardUser from "./Component/Fragments/DashboardCardUser/CardUser.jsx";
import DashboardPromo from "./Component/Fragments/DashboardPromo/DashboardPromo.jsx";
import DashboardBanner from "./Component/Fragments/DashboardBanner/DashboardBanner.jsx";
import DashboardCategory from "./Component/Fragments/DashboardCategory/DashboardCategory.jsx";
import DashboardActivity from "./Component/Fragments/DashboardActivity/DashboardActivity.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PromoUser from "./Component/Element/UserPage/Promo/PromoUser.jsx";
import Activity from "./Component/Element/UserPage/Activity/Activity.jsx";
import ActivityDetailCard from "./Component/Element/UserPage/Activity/ActifityDetail.jsx";
import ProtectedRoute from "./Routes/ProtectedRoute.jsx";
import EditProfile from "./Component/Element/EditProfil/EditProfil.jsx";
import Search from "./Component/Element/Search/Search.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/banner",
    element: <Banner />,
  },
  {
    path: "/homepageadmin",
    element: <ProtectedRoute />,
    children: [
      {
        path: "",
        element: <HomePageAdmin />,
        children: [
          {
            path: "alluser",
            element: <CardUser />,
          },
          {
            path: "promo",
            element: <DashboardPromo />,
          },
          {
            path: "banner",
            element: <DashboardBanner />,
          },
          {
            path: "category",
            element: <DashboardCategory />,
          },
          {
            path: "activity",
            element: <DashboardActivity />,
          },
        ],
      },
    ],
  },
  {
    path: "/promoUser",
    element: <PromoUser />,
  },
  {
    path: "/activityUser",
    element: <Activity />,
  },
  {
    path: "/activity/:id",
    element: <ActivityDetailCard />,
  },
  {
    path: "/editprofil",
    element: <EditProfile/>
  },
  {
    path: "search",
    element: <Search/>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
