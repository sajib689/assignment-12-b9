import { Outlet } from "react-router-dom";
import { useState } from "react";
import useAuth from "./../Hooks/useAuth";
import UserMenu from "./Users/UserMenu";

const UserDashboard = () => {
  const { user } = useAuth();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="flex flex-col min-h-screen md:flex-row lg:flex-row">
      <div className={`fixed inset-0 z-50 ${isDrawerOpen ? 'block' : 'hidden'} md:block`}>
        <UserMenu onToggle={handleDrawerToggle} />
      </div>
      <div className={`flex-grow p-4 ${isDrawerOpen ? 'ml-80 md:ml-0' : ''}`}>
        <Outlet />
      </div>
      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-black opacity-50 md:hidden"
          onClick={handleDrawerToggle}
        ></div>
      )}
    </div>
  );
};

export default UserDashboard;
