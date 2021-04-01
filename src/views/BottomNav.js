import React from "react";
import { Link } from "react-router-dom";
import "./BottomNav.css";
import loupe from "../images/loupe.png";
import list from "../images/list.png";
import usericon from "../images/user.png";

const BottomNav = () => {
  return (
    <div className="bottom-nav">
      {/* <Link to="/profile">
        {" "}
        <img src={usericon} alt="profile-icon" />{" "}
      </Link> */}
      <Link to="/search">
        {" "}
        <img src={loupe} alt="search-icon" />{" "}
      </Link>
      {/* <Link to="/queue">
        {" "}
        <img src={list} alt="queue-icon" />{" "}
      </Link> */}
    </div>
  );
};

export default BottomNav;
