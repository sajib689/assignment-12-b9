import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import Lottie from 'lottie-react'; // Import Lottie for animations
import registerr from '../../public/register.json'; // Assuming this is your animation file
import SocialLogin from './SocialLogin';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from './../Hooks/useAuth';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { updateProfile } from 'firebase/auth';

const image_api_key = import.meta.env.VITE_IMAGE_API_KEY;
const image_url = `https://api.imgbb.com/1/upload?key=${image_api_key}`;

const Register = () => {
  const { registerByFiled, google, gitHub } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Register form setup using react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
        // user image send to imgbb website
      const formData = new FormData();
      formData.append('image', data.photoURL[0]);
      const res = await axios.post(image_url, formData);
      const image = res.data.data.display_url
      // end image upload complete
      if (data.password.length < 6) {
        toast.error("Password must be at least 6 characters long!");
        return
      } else if (!/[A-Z]/.test(data.password)) {
        toast.error("Password must contain at least one uppercase letter!");
        return;
      } else if (!/[a-z]/.test(data.password)) {
        toast.error("Password must contain at least one lowercase letter!");
        return;
      }
      registerByFiled(data.email, data.password)
      .then(result => {
        const user = result.user
        updateProfile(user, {
            displayName: data.displayName,
            photoURL: image,
        })
        if(data) {
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Sign In Success",
                showConfirmButton: false,
                timer: 1500
              });
        }
        reset()
        navigate(location.state ? location.state : '/login')
      })
      .catch(err => {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text:  `${err.message}`,
          });
      })

    } catch (error) {
      console.error(error.message);
      toast.error('Failed to upload image');
    }
  };

  return (
    <>
      <Toaster />
      <section className="py-6 mt-12 mb-48">
        <div className="grid max-w-6xl grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 md:divide-x">
          <div className="py-6 md:py-0 md:px-6 flex flex-col items-left">
            <h1 className="text-4xl font-bold">Register</h1>
            <p className="pt-2 pb-4">
              Join ScholarHub to access exclusive resources and community.
            </p>
            <Lottie
              className="md:h-[60vh]"
              animationData={registerr}
              loop={true}
            />
            <div className="space-y-4">
              <p className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 mr-2 sm:mr-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span>Muragacha, Manirampur, Jashore</span>
              </p>
              <p className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 mr-2 sm:mr-6"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                </svg>
                <span>+880 1611-970979</span>
              </p>
              <p className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 mr-2 sm:mr-6"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
                <span>sajibbabu751@gmail.com</span>
              </p>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col py-6 space-y-6 md:py-0 md:px-6"
          >
            <label className="block">
              <span className="mb-1">Full Name</span>
              <input
                {...register('displayName', { required: true })}
                name="displayName"
                type="text"
                placeholder="John Doe"
                className="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:ring-violet-600 bg-white h-12 text-lg"
              />
              {errors.displayName && (
                <span className="text-red-600">This field is required</span>
              )}
            </label>
            <label className="block">
              <span className="mb-1">Email Address</span>
              <input
                {...register('email', { required: true })}
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
              <span className="mb-1">Image</span>
              <input
                {...register('photoURL', { required: true })}
                name="photoURL"
                type="file"
                className="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:ring-violet-600 bg-white h-12 text-lg"
              />
              {errors.photoURL && (
                <span className="text-red-600">This field is required</span>
              )}
            </label>

            <label className="block">
              <span className="mb-1">Password</span>
              <input
                {...register('password', { required: true })}
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
              Register
            </button>
            <SocialLogin />
          </form>
        </div>
      </section>
    </>
  );
};

export default Register;
