import React from "react";
import "./Profile.css";
import { getProfile, updateProfile } from "../services/profileService";

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
      <div>
        <table className="profileInfo">
          <tbody>
            <tr>
              <td>Stage Name:</td>
              <td>{user.stageName}</td>
            </tr>
            <tr>
              <td>First Name:</td>
              <td>{user.firstName}</td>
            </tr>
            <tr>
              <td>Last Name:</td>
              <td>{user.lastName}</td>
            </tr>
            <tr>
              <td>Email:</td>
              <td>{user.email}</td>
            </tr>
            <tr>
              <td>Photo:</td>
              <td>
                {user.photoUrl !== undefined && (
                  <img
                    className="profile-image"
                    src={user.photoUrl}
                    alt="profile"
                  />
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Profile;
