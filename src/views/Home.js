import React from "react";

const Home = (props) => {
  // const { username } = props.user;
  return (
    <div className="home-container">
    <img className="logo" src={"https://res.cloudinary.com/dcod1zxnl/image/upload/v1603130425/Noda_101_Logo_l72snm.png"} alt="Noda 101 Logo" />
      {/* <h1>welcome {username && props.user.username}</h1> */}
    </div>
  );
};

export default Home;
