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
import UserApplications from "../Components/Users/UserApplications";
import UserProfile from "../Components/Users/UserProfile";
import UserReview from "../Components/Users/UserReview";
import UpdateReview from "../Components/Users/UpdateReview";
import UpdateApplication from "../Components/Users/UpdateApplication";
import ManageUsers from "../Components/Admin/ManageUsers";
import AddUniversity from "../Components/Admin/AddUniversity";
import ManageApplicatins from "../Components/Admin/ManageApplicatins";
import ManageReview from "../Components/Admin/ManageReview";
import ManageScholar from "../Components/Admin/ManageScholar";
import PrivateRoute from './../Provider/PrivateRoute';
import DashboardAdmin from "../Components/Admin/DashboardAdmin";



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
            element: <PrivateRoute><ScholarDetails/></PrivateRoute>,
            loader: ({params}) => fetch(`https://assignment-12-server-eta-rosy.vercel.app/university/${params.id}`)
        
        },
        {
          path: "/payment/:id",
          element: <PrivateRoute><Payment/></PrivateRoute>,
          loader: ({params}) => fetch(`https://assignment-12-server-eta-rosy.vercel.app/university/${params.id}`)
        },
        {
          path: "/application/:id",
          element: <PrivateRoute><ApplicationForm/></PrivateRoute>,
          loader: ({params}) => fetch(`https://assignment-12-server-eta-rosy.vercel.app/university/${params.id}`)
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
    {
      path: "/userDashboard",
      element: <PrivateRoute><UserDashboard/></PrivateRoute>,
      children: [
        // users route
        {
          path: "userApplication",
          element: <PrivateRoute><UserApplications/></PrivateRoute>,
        },
        {
          path: "userProfile",
          element: <PrivateRoute><UserProfile/></PrivateRoute>,
        },
        {
          path: "userReview",
          element: <PrivateRoute><UserReview/></PrivateRoute>,
        },
        {
          path: "updatereview/:id",
          element: <PrivateRoute><UserReview/></PrivateRoute>,
          loader: ({params}) => fetch(`https://assignment-12-server-eta-rosy.vercel.app/reviews/${params.id}`)
        },
        {
          path: "updateapplication/:id",
          element: <PrivateRoute><UpdateApplication/></PrivateRoute>,
          loader: ({params}) => fetch(`https://assignment-12-server-eta-rosy.vercel.app/applications/${params.id}`)
        },
        // admin routes
        {
          path: "manageusers",
          element: <ManageUsers/>
        },
        {
          path: "addscholarships",
          element: <AddUniversity/>
        },
        {
          path: "manageApplicatins",
          element: <ManageApplicatins/>
        },
        {
          path: "managereview",
          element: <ManageReview/>
        },
        {
          path: "managescholar",
          element: <ManageScholar/>
        },
        {
          path: "userHome",
          element: <DashboardAdmin/>
        },
      ]
    },
  ]);

  export default router;