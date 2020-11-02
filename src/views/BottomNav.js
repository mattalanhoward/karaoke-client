import React from "react";
import { Link } from "react-router-dom";
import "./BottomNav.css";

const BottomNav = () => {
  return (
    <div className="bottom-nav">
      <Link to="/profile"> Profile </Link>
      <Link to="/search"> Search </Link>
      <Link to="/queue"> Queue </Link>
    </div>
  );
};

export default BottomNav;
