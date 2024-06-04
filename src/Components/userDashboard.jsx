import { Outlet } from "react-router-dom";
import useAuth from "./../Hooks/useAuth";
import UserMenu from "./Users/UserMenu";

const UserDashboard = () => {
  const { user } = useAuth();
  return (
    <div className="max-w-6xl mx-auto">
      <div>
        <UserMenu />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default UserDashboard;
