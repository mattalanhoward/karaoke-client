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

        <Link to={"/editprofile"}>Edit Profile</Link>
        <ul className="profile-info">
          {user.firstName && user.lastName !== undefined && (
            <li>
              <h3>
                {user.firstName} {user.lastName}
              </h3>
            </li>
          )}

          <li>
            <h4>Stage Name</h4>
            <h2>{user.stageName}</h2>
          </li>

          {user.favoriteArtist !== undefined && (
            <li>
              <h4>Favorite Artist</h4>
              <h2>{user.favoriteArtist}</h2>
            </li>
          )}

          <li>
            <h3>{user.email}</h3>
          </li>
        </ul>

        <BottomNav />
      </div>
    );
  }
}

export default Profile;
