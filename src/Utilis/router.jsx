import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/MainLayout/MainLayout";
import Home from "../components/Home/Home";
import MyProfile from "../components/MyProfile/MyProfile";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import ServicesDetails from "../components/ServicesDetails/ServicesDetails";
import ErrorPage from "../components/ErrorPage/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path:"/profile",
        element:<MyProfile></MyProfile>
      },
      {
        path:"/login",
        element:<Login></Login>
      },
      {
        path:"/register",
        element:<Register></Register>
      },
      {
        path:"/servicesDetails/:id",
        element:<ServicesDetails></ServicesDetails>
      },
      {
        path:"*",
        element:<ErrorPage></ErrorPage>
      },
    ],
  },
]);

export default router;
