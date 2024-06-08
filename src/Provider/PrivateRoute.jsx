import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import Loader from './../Utilities/Loader';


const PrivateRoute = ({children}) => {
    const {user,loading} = useAuth()
    const location = useLocation()
    if(loading) {
        return <Loader/>
    }
    if(user) {
        return children
    }
    <Navigate to='/' state={location.pathname}></Navigate>
   
};

export default PrivateRoute;