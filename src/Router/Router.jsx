import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from './../Outlet/Home';
import AllScholarShips from "../Components/AllScholarShips";


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
      ]
    },
  ]);

  export default router;