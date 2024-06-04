import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from './../Outlet/Home';
import AllScholarShips from "../Components/AllScholarShips";
import Login from './../Authorization/Login';
import Register from './../Authorization/Register';
import ScholarDetails from "../Components/ScholarDetails";
import Payment from "../Components/Payment";
import ApplicationForm from "../Components/ApplicationForm";
import Error from "../Components/Error";
import UserDashboard from "../Components/UserDashboard";



const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      errorElement: <Error/>,
      children: [
        {
            path: "/",
            element: <Home/>,
        },
        {
            path: "/allScholarShips",
            element: <AllScholarShips/>
          },
        {
            path: "/scholarShipDetails/:id",
            element: <ScholarDetails/>,
            loader: ({params}) => fetch(`http://localhost:3000/university/${params.id}`)
        
        },
        {
          path: "/payment/:id",
          element: <Payment/>,
          loader: ({params}) => fetch(`http://localhost:3000/university/${params.id}`)
        },
        {
          path: "/application/:id",
          element: <ApplicationForm/>,
          loader: ({params}) => fetch(`http://localhost:3000/university/${params.id}`)
        },
        {
          path: "/userDashboard",
          element: <UserDashboard/>
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