import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { app } from "../Firebase.js";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [file, setfile] = useState(undefined);
  const [fileUplaoderror, setfileUplaoderror] = useState(false);
  const [filepre, setfilepre] = useState(0);
  const [formDate, setformDate] = useState({});
  const nevigate = useNavigate();
  const Fileref = useRef(null);
  useEffect(() => {
    if (!currentUser) {
      nevigate("/sign-in");
    }
  }, []);

  // const handleFileUpload = (file) => {
  //   const storage = getStorage(app);
  //   const fileName = new Date().getTime() + file.name;
  //   const storageRef = ref(storage, fileName);
  //   const uploadtask = uploadBytesResumable(storageRef, file);

  //   uploadtask.on("state_changed", (snapshot) => {
  //     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //     setfilepre(Math.round(progress));
  //   });
  //   (error) => {setfileUplaoderror(true)}

  //   () => {
  //     getDownloadURL(uploadtask.snapshot.ref).then((downloadUrl) =>
  //       setformDate({ ...formDate, avatar: downloadUrl })
  //     );
  //   };
  // };

  console.log(formDate);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadtask = uploadBytesResumable(storageRef, file);

    uploadtask.on("state_changed", (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setfilepre(Math.round(progress));

      uploadtask.catch((error) => {
        setfileUplaoderror(true);
      });

      uploadtask.then(() => {
        getDownloadURL(uploadtask.snapshot.ref).then((downloadUrl) =>
          setformDate({ ...formDate, avatar: downloadUrl })
        );
      });
    });
  };

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  return (
    <div className="p-1 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-3">
        <input
          onChange={(e) => {
            setfile(e.target.files[0]);
          }}
          type="file"
          hidden
          accept="image/*"
          ref={Fileref}
        />
        <img
          src={formDate.avatar || currentUser.avatar}
          id="username"
          onClick={() => {
            Fileref.current.click();
          }}
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
          alt="Profile"
        />
        <p className="text-sm self-center">
          {fileUplaoderror ? (
            <span className="text-red-700">Error image upload(image must less than 2MB)</span>
          ) : filepre > 0 && filepre < 100 ? (
            <span className=" text-slate-700">{`Uploading ${filepre}%`}</span>
          ) : filepre === 100 ? (
            <span className="text-green-700 capitalize">
              successfully uploaded
            </span>
          ) : null}
        </p>

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
