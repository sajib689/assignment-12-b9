import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { IoMdMenu } from "react-icons/io";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const UserMenu = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure()
  useEffect(() => {
    axiosPublic.get("/users").then((res) => {
      setUsers(res.data);
    });
  }, [axiosPublic]);
  const {data: role = []} = useQuery({
    queryKey: ['role'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user?.email}`)
      return res.data
    }
  })
  const links = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/userDashboard/userProfile">My Profile</Link>
      </li>
      {
        role.role === 'user' && 
       <>
       <li>
        <Link to="/userDashboard/userApplication">My Applications</Link>
      </li>
      <li>
        <Link to="/userDashboard/userReview">My Reviews</Link>
      </li>
       </>
      }
      {
        role.role === 'admin' &&
        <>
        <li>
        <Link to="/userDashboard/userApplication">Add Scholarship</Link>
      </li>
      <li>
        <Link to="/userDashboard/userReview">Manage Scholarship</Link>
      </li>
      <li>
        <Link to="/userDashboard/userReview">Manage Applied Application</Link>
      </li>
      <li>
        <Link to="/userDashboard/manageusers">Manage Users</Link>
      </li>
      <li>
        <Link to="/userDashboard/userReview">Manage Review</Link>
      </li>
        </>
      }
    </>
  );
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {links}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        <a className="btn">Button</a>
      </div>
    </div>
  );
};

export default UserMenu;
