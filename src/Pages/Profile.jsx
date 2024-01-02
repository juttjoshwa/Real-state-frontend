import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const nevigate = useNavigate();
  useEffect(() => {
    if (!currentUser) {
      nevigate("/sign-in");
    }
  }, []);

  return (
    <div className="p-1 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-3">
        <img
          src={currentUser.avatar}
          id="username"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
          alt="Profile"
        />
        <input
          id="email"
          type="text"
          placeholder="email"
          className="border p-3 rounded-lg"
        />
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
        />
        <input
          type="password"
          placeholder="username"
          className="border p-3 rounded-lg"
          id="password"
        />
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase  hover:90% disabled:80%">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-3">
        <span className="text-rose-700 cursor-pointer capitalize">
          Delete account
        </span>
        <span className="text-red-700 cursor-pointer capitalize">Sign out</span>
      </div>
    </div>
  );
};

export default Profile;
