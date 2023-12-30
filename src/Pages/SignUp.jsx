import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import time from "../Asset/time.png";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      await axios
        .post("/auth/signup", {
          name: username,
          email: email,
          password: password,
        })
        .then((res) => {
          toast.success("OK");
          setloading(false);
          setusername("");
          setemail("");
          setpassword("");
        })
        .catch((err) => {
          toast.error(err.message || "Something went wrong");
          setloading(false);
        });
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-center text-3xl font-semibold my-7 select-none">
        Sign Up
      </h1>
      <form onSubmit={HandleSubmit} className="flex flex-col gap-4">
        <input
          type="text "
          placeholder="Username"
          value={username}
          onChange={(e) => {
            setusername(e.target.value);
          }}
          className="border p-3 rounded-lg"
          id="username"
          required
        />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => {
            setemail(e.target.value);
          }}
          placeholder="Email"
          className="border p-3 rounded-lg"
          id="email"
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          id="password"
          required
          value={password}
          onChange={(e) => {
            setpassword(e.target.value);
          }}
        />
        <button
          disabled={loading ? true : false}
          type="submit"
          className={
            loading
              ? "flex justify-center items-center bg-slate-700 text-white p-0 rounded-lg uppercase hover:opacity-90 disabled:opacity-60"
              : "flex justify-center items-center bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-60"
          }
        >
          {!loading ? (
            "Sign Up"
          ) : (
            <img src={time} className="w-14 h-14 invert" alt="time" />
          )}
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
