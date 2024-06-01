import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from './../Outlet/Home';
import AllScholarShips from "../Components/AllScholarShips";
import Login from './../Authorization/Login';
import Register from './../Authorization/Register';


const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      children: [
        {
            path: "/",
            element: <Home/>,
        },
        {
            path: "/allScholarShips",
            element: <AllScholarShips/>,
        },
        {
            path: "/login",
            element: <Login/>,
        },
        {
            path: "/register",
            element: <Register/>,
        },
      ]
    },
  ]);

  export default router;