import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-center text-3xl font-semibold my-7 select-none">
        Sign Up
      </h1>
      <form className="flex flex-col gap-4">
        <input
          type="text "
          placeholder="username"
          className="border p-3 rounded-lg"
          id="username"
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
          id="email"
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          id="password"
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80">
          Sign Up
        </button>
      </form>
      <div className="flex my-3 gap-1">
        <p>Have an account?</p>
        <span className="text-blue-700">
          <Link to="/sign-in">Sign In</Link>
        </span>
      </div>
    </div>
  );
};

export default SignUp;
