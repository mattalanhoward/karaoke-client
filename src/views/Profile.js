import React from "react";
import "./Profile.css";
import BottomNav from "./BottomNav";
import { Link } from "react-router-dom";
import logout from "../images/logout.png";

const Profile = (props) => {
  //user from App.js
  const user = props.user;
  // console.log(`PROFILE USER`, user);

  //Get written out date for users first signup.
  const startDate = new Date(user.createdAt);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthIndex = startDate.getMonth();
  const monthName = months[monthIndex];
  const year = startDate.getFullYear();

  return (
    <div className="profile">
      <section className="profile-heading-container">
        <div className="profile-heading">
          <div className="logout-duplicate">Logout</div>
          <h1>Profile</h1>
          <div className="logout">
            <Link to={"/"} onClick={props.logout()}>
              <img src={logout} alt="logout"></img>
            </Link>
          </div>
        </div>
        <div className="profile-image-container">
          {user.photoUrl !== undefined && (
            <img className="profile-image" src={user.photoUrl} alt="profile" />
          )}
        </div>
      </section>

      <Link className="profile-btn" to={"/editprofile"}>
        Edit Profile
      </Link>

      <table className="profile-info">
        <tbody>
          <tr>
            <td>
              <p>Stage Name: </p>
            </td>
            <td>
              <h3>{user.stageName}</h3>
            </td>
          </tr>
          {user.firstName !== undefined && user.lastName !== undefined && (
            <tr>
              <td>
                <p>Name: </p>
              </td>
              <td>
                <h3>
                  {user.firstName} {user.lastName}
                </h3>
              </td>
            </tr>
          )}
          {user.favoriteArtist !== undefined && (
            <tr>
              <td>
                <p>Favorite Artist: </p>
              </td>
              <td>
                <h3>{user.favoriteArtist}</h3>
              </td>
            </tr>
          )}
          {user.totalSongs !== undefined && (
            <tr>
              <td>
                <p>Songs Sang: </p>
              </td>
              <td>
                <h3>{user.totalSongs}</h3>
              </td>
            </tr>
          )}
          {/* {user.totalSongs !== undefined && (
              <tr>
                <td>
                  <p>Noda 101 Street Cred: </p>
                </td>
                <td>
                  <h3>
                    {`${user.rank} 
                    of ${user.totalUsers}`}
                  </h3>
                </td>
              </tr>
            )} */}
          <tr>
            <td>
              <p>Rockstar Since: </p>
            </td>
            <td>
              <h3>
                {monthName}, {year}
              </h3>
            </td>
          </tr>
        </tbody>
      </table>
      {user.email}

      <BottomNav />
    </div>
  );
};

export default Profile;
