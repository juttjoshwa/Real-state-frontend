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

  return <h1>Profile</h1>;
};

export default Profile;
