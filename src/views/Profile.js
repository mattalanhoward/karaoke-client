import React from "react";
import "./Profile.css";
import { getProfile } from "../services/profileService";
import BottomNav from "./BottomNav";
import { Link } from "react-router-dom";

class Profile extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    stageName: "",
    email: "",
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
        <section className="profile-heading">
          <div className="logout-duplicate">Logout</div>
          <h1>Profile</h1>
          <div className="logout">
            <Link to={"/"} onClick={this.props.logout()}>
              Logout
            </Link>
          </div>
        </section>
        <div className="profile-image-container">
          {user.photoUrl !== undefined && (
            <img className="profile-image" src={user.photoUrl} alt="profile" />
          )}
        </div>
        <table className="profileInfo">
          <tbody>
            <tr>
              <h4>
                <Link to={"/editprofile"}>Edit Profile</Link>
              </h4>
            </tr>
            <tr className="name">
              <td>
                <h1>
                  {user.firstName}
                  {` ${user.lastName}`}
                </h1>
              </td>
            </tr>
            <tr>
              <td className="name">
                <h1>{user.stageName}</h1>
              </td>
            </tr>
            {/* <tr>
              <td>
                <h3>Favorite Artist</h3>
              </td>
              <td>{user.email}</td>
            </tr> */}
            <tr>
              <td>
                <h3>Number of Songs Sang</h3>
              </td>
              <td>12</td>
            </tr>
            <tr>
              <td>
                <h3>Rank</h3>
              </td>
              <td>4 of 304</td>
            </tr>
            <tr>
              <td>{user.email}</td>
            </tr>
          </tbody>
        </table>
        <BottomNav />
      </div>
    );
  }
}

export default Profile;
