import React, { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getAuth } from "firebase/auth";
import app from "../Firebase/firebase.config";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  });

  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  const handleSignup = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your signup logic here
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="w-1/2 p-3 border border-gray-300 rounded-lg"
              onChange={handleChange}
              value={formData.username}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-1/2 p-3 border border-gray-300 rounded-lg"
              onChange={handleChange}
              value={formData.email}
            />
          </div>
          <div className="flex space-x-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="w-1/2 p-3 border border-gray-300 rounded-lg"
              onChange={handleChange}
              value={formData.firstName}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="w-1/2 p-3 border border-gray-300 rounded-lg"
              onChange={handleChange}
              value={formData.lastName}
            />
          </div>
          <div className="flex space-x-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-1/2 p-3 border border-gray-300 rounded-lg"
              onChange={handleChange}
              value={formData.password}
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-1/2 p-3 border border-gray-300 rounded-lg"
              onChange={handleChange}
              value={formData.confirmPassword}
            />
          </div>
          <div className="flex space-x-4">
            <select name="countryCode" className="p-3 border border-gray-300 rounded-lg w-1/5" onChange={handleChange}>
              <option value="+1">+1 (US)</option>
              <option value="+44">+44 (UK)</option>
              <option value="+91">+91 (India)</option>
              <option value="+61">+61 (Australia)</option>
              <option value="+81">+81 (Japan)</option>
              {/* Add more country codes as needed */}
            </select>
            <input
              type="tel"
              name="mobileNumber"
              placeholder="Mobile Number"
              className="w-3/4 p-3 border border-gray-300 rounded-lg"
              onChange={handleChange}
              value={formData.mobileNumber}
            />
          </div>

          
          <button
            type="submit"
            className="w-full bg-blue text-white py-2 rounded-lg mb-4"
          >
            Sign Up
          </button>

          {/* Divider */}
          <div className="flex items-center justify-center my-4">
            <div className="w-full border-t border-gray-300"></div>
            <span className="px-4 text-gray-500">Or</span>
            <div className="w-full border-t border-gray-300"></div>
          </div>

          <button
            className="w-full bg-green-600 text-white py-2 rounded-lg"
            onClick={handleSignup}
          >
            Sign Up with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
