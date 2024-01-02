import { Route, Routes } from "react-router-dom";
import "./App.css";
import axios from "axios";
import Home from "./Pages/Home";
import SignIn from "./Pages/SignIn";
import About from "./Pages/About";
import Profile from "./Pages/Profile";
import SignUp from "./Pages/SignUp";
import Header from "./Componets/Header";
import PrivateRoute from "./Componets/PrivateRoute";

function App() {
  axios.defaults.baseURL = "http://localhost:4000/api/"; // Set the base URL for Axios requests
  axios.defaults.withCredentials = true;
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
