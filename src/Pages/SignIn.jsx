import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signinStart,
  signInSuccess,
  signInFailure,
} from "../redux/User/User.js";
import axios from "axios";

const SignIn = () => {
  const dispatch = useDispatch();
  const nevigate = useNavigate();
  const [email, setemail] = useState("");
  const [loading1, setloading] = useState(false);
  const { loading, error } = useSelector((state) => state.user);
  const [password, setpassword] = useState("");

  console.log(error);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      await axios
        .post("/auth/signin", {
          email: email,
          password: password,
        })
        .then((res) => {
          dispatch(signInSuccess(res.data));
          setloading(false);
          console.log(res.data.restof);
          setemail("");
          setpassword("");
        })
        .catch((err) => {
          dispatch(signInFailure(err.response.data.message));
          setloading(false);
          // console.log(err.response.data.message);
        });
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-center text-3xl font-semibold my-7 select-none">
        Sign in
      </h1>
      <form onSubmit={HandleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
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
          value={password}
          onChange={(e) => {
            setpassword(e.target.value);
          }}
        />
        <button
          type="submit"
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80"
        >
          Sign In
        </button>
      </form>
      <div className="flex my-3 gap-1">
        <p>Have an account?</p>
        <span className="text-blue-700">
          <Link to="/sign-up">Sign Up</Link>
        </span>
      </div>
      {error === null ? (
        <p className="d-none"></p>
      ) : (
        <p className="text-red-700 py-4">{error}</p>
      )}
    </div>
  );
};

export default SignIn;
