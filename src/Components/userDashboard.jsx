import { Link, Outlet } from "react-router-dom";
import useAuth from "./../Hooks/useAuth";
import UserMenu from "./Users/UserMenu";

const UserDashboard = () => {
  const { user } = useAuth();
  return (
    <div className="flex flex-col md:flex-row lg:flex-row">
        <div className="w-1/4">
        <UserMenu/>
        </div>
        <div className="w-3/4">

            <Outlet/>
        </div>
    </div>
  );
};

export default UserDashboard;
