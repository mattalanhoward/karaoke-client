import React from "react";
import "./Profile.css";
import { getProfile } from "../services/profileService";
import BottomNav from "./BottomNav";
import { Link } from "react-router-dom";
import logout from "../images/logout.png";

class Profile extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    stageName: "",
    email: "",
    favoriteArtist: "",
    password: "",
    photoUrl: "",
    createdAt: "",
    totalSongs: "",
    rank: "",
    totalUsers: "",
    errorMessage: "",
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(previousProps, previousState) {
    const userChanged = previousState.stageName !== this.state.stageName;
    if (userChanged) {
      this.fetchData();
    }
  }

  fetchData = async () => {
    try {
      const updatedUser = await getProfile({
        userId: this.props.user._id,
      });
      this.setState({
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        stageName: updatedUser.stageName,
        favoriteArtist: updatedUser.favoriteArtist,
        email: updatedUser.email,
        password: updatedUser.password,
        photoUrl: updatedUser.photoUrl,
        createdAt: updatedUser.createdAt,
        totalSongs: updatedUser.totalSongs,
        rank: updatedUser.rank,
        totalUsers: updatedUser.totalUsers,
        errorMessage: "",
      });
    } catch (error) {
      this.setState({
        errorMessage: error,
      });
    }
  };

  render() {
    const user = this.state;
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
              <Link to={"/"} onClick={this.props.logout()}>
                <img src={logout} alt="logout"></img>
              </Link>
            </div>
          </div>
          <div className="profile-image-container">
            {user.photoUrl !== undefined && (
              <img
                className="profile-image"
                src={user.photoUrl}
                alt="profile"
              />
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
  }
}

export default Profile;
