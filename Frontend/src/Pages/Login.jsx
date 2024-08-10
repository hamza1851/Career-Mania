import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getAuth } from "firebase/auth";
import app from "../Firebase/firebase.config";

const Login = () => {
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  const handleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <input
          type="text"
          placeholder="Username or Email"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 border border-gray-300 rounded-lg"
        />
        <button className="w-full bg-blue text-white py-2 rounded-lg mb-4">
          Login
        </button>

        {/* Divider */}
        <div className="flex items-center justify-center my-4">
            <div className="w-full border-t border-gray-300"></div>
            <span className="px-4 text-gray-500">Or</span>
            <div className="w-full border-t border-gray-300"></div>
          </div>

        <button
          className="w-full bg-green-600 text-white  py-2 rounded-lg"
          onClick={handleLogin}
        >
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
