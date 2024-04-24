import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss?v1.1.0";
import "tailwindcss/tailwind.css";

import Index from "views/Index.js";
import Landing from "views/examples/Landing.js";
import Login from "views/examples/Login.js";
import Profile from "views/examples/Profile.js";
import Register from "views/examples/Register.js";
import Venue from "views/examples/Venue";
import Activity from "views/examples/Activity";
import People from "views/examples/People";
import Home from "views/examples/Home";
// import Test from "views/examples/Test";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" exact element={<Index />} />
      <Route path="/landing" exact element={<Landing />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/profile" exact element={<Profile />} />
      <Route path="/register" exact element={<Register />} />
      <Route path="/venue" exact element={<Venue />} />
      <Route path="/activity" exact element={<Activity />} />
      <Route path="/peoples" exact element={<People />} />
      <Route path="/home" exact element={<Home />} />
      {/* <Route path="/test-page" exact element={<Test/>}/> */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);
