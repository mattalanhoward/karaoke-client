import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Pulse from "react-reveal/Pulse";

const Home = (props) => {
  return (
    <div className="home-container">
      <Pulse duration={2000} forever={true}>
        <img
          className="logo"
          src={
            "https://res.cloudinary.com/dcod1zxnl/image/upload/v1604931135/Noda_101_Logo_Cropped_aahox3.png"
          }
          alt="Noda 101 Logo"
        />
      </Pulse>
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
