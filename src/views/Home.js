import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = (props) => {
  return (
    <div className="home-container">
      <img
        className="logo"
        src={
          "https://res.cloudinary.com/dcod1zxnl/image/upload/v1603130425/Noda_101_Logo_l72snm.png"
        }
        alt="Noda 101 Logo"
      />
      <div className="login-buttons">
        <button className="nav-btns green-btn">
          <Link to="/login"> Login </Link>
        </button>
        <button className="nav-btns wht-btn">
          <Link to="/signup"> Signup </Link>
        </button>
      </div>
    </div>
  );
};

export default Home;
