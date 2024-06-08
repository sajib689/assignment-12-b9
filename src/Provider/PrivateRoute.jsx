import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import Loader from './../Utilities/Loader';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <Loader />;
    }

    if (user) {
        return children;
    }

    // Return the Navigate component when the user is not authenticated
    return <Navigate to='/login' state={{ from: location }} />;
};

export default PrivateRoute;
