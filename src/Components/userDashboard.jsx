import { Outlet } from "react-router-dom";
import { useState } from "react";
import UserMenu from "./Users/UserMenu";

const UserDashboard = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerToggle = (isOpen) => {
    setIsDrawerOpen(isOpen);
  };

  return (
    <div className={`flex flex-col md:flex-row lg:flex-row min-h-screen ${isDrawerOpen ? 'bg-opacity-50' : ''}`}>
      <UserMenu onDrawerToggle={handleDrawerToggle} />
      <div className={`flex-grow ${isDrawerOpen ? 'bg-opacity-50' : ''}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default UserDashboard;
