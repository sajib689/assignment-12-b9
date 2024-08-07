import { Link, useLocation, useNavigate } from "react-router-dom";
import SocialLogin from "./SocialLogin";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import Lottie from "lottie-react";
import registerr from "../../public/register.json";
import useAuth from "../Hooks/useAuth";
import Loader from "./../Utilities/Loader";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  // Login form setup using react-hook-form
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    login(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        reset();
        navigate(location.state ? location.state : "/");
      })
      .catch((error) => {
        // console.log(error.code);
        // console.log(error.message);
        switch (error.code) {
          case "auth/invalid-email":
            toast.error("Invalid email format.");
            break;
          case "auth/user-disabled":
            toast.error("This user account has been disabled.");
            break;
          case "auth/user-not-found":
            toast.error("No user found with this email.");
            break;
          case "auth/wrong-password":
            toast.error("Incorrect password.");
            break;
          case "auth/invalid-credential":
            toast.error("Invalid email or password.");
            break;
          default:
            toast.error("An unexpected error occurred. Please try again.");
        }
      });
  };
  // if(loading) return <Loader/>
  return (
    <>
      <Toaster />
      <section className="py-6 mt-12 mb-48">
        <div className="grid max-w-6xl grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 md:divide-x">
          <div className="py-6 md:py-0 md:px-6 flex flex-col items-left">
            <h1 className="text-4xl font-bold">Login Now</h1>
            <p className="pt-2 pb-4">
              Join ScholarHub to access exclusive resources and community.
            </p>
            <Lottie
              className="md:h-[60vh]"
              animationData={registerr}
              loop={true}
            />
          </div>
          <div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="flex flex-col py-6 space-y-6 md:py-0 md:px-6"
            >
              <label className="block">
                <span className="mb-1">Email Address</span>
                <input
                  {...register("email", { required: true })}
                  name="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  className="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:ring-violet-600 bg-white h-12 text-lg"
                />
                {errors.email && (
                  <span className="text-red-600">This field is required</span>
                )}
              </label>

              <label className="block">
                <span className="mb-1">Password</span>
                <input
                  {...register("password", { required: true })}
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:ring-violet-600 bg-white h-12 text-lg"
                />
                {errors.password && (
                  <span className="text-red-600">This field is required</span>
                )}
              </label>

              <button
                type="submit"
                className="self-start px-8 py-3 text-lg rounded focus:ring hover:ring focus:ring-opacity-75 bg-blue-600 text-white focus:ring-blue-600 hover:ring-violet-600"
              >
                Sign In
              </button>
            </form>
            <SocialLogin />
            <p className="px-6 text-sm text-start dark:text-gray-600">
              Don't have an account yet?
              <Link
                to="/register"
                className="hover:underline dark:text-violet-600"
              >
                Sign up
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
