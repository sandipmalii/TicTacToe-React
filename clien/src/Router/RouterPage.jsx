import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home.jsx";
import About from "../pages/About.jsx";
import Login from "../pages/Login.jsx";
import Signup from "../pages/Signup.jsx";
import Feedback from "../pages/Feedback.jsx";
import Features from "../pages/Features.jsx";
import Contact from "../pages/Contact.jsx";
import ForgotPassword from "../pages/ForgotPassword.jsx";
import Playerdetails from "../player/Playerdetails.jsx";
import Profile from "../profile/Profile.jsx";
import Settings from "../profile/Settings.jsx";
import PrivacyPolicy from "../pages/PrivacyPolicy.jsx";
import Developer from "../pages/Developer.jsx";
import MainBoard from "../pages/MainBoard.jsx";
import TermsOfService from "../pages/TermsOfService.jsx";

const RouterPage = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/features" element={<Features />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/profile/:id" element={<Playerdetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/developer" element={<Developer />} />
        <Route path="/board" element={<MainBoard />} />
      </Routes>
    </div>
  );
};

export default RouterPage;
