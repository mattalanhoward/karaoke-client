import React from "react";
import { Link } from "react-router-dom";
import { updateProfile, handleUpload } from "../services/profileService";
// import { Redirect } from "react-router-dom"
import BottomNav from "./BottomNav";
import logout from "../images/logout.png";

class EditProfile extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    stageName: "",
    favoriteArtist: "",
    email: "",
    photoUrl: "",
    errorMessage: "",
  };

  // Handles input change and changes the state.
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  // Profile photo upload
  handleFileUpload = (event, userId) => {
    console.log("The file to be uploaded is: ", event.target.files[0]);

    const uploadData = new FormData();
    // photoUrl => this name has to be the same as in the model since we pass
    uploadData.append("photoUrl", event.target.files[0]);

    handleUpload(uploadData, this.props.user._id)
      .then((response) => {
        this.setState(
          {
            photoUrl: response,
          },
          () => console.log(`photo response `, response)
        );
      })
      .catch((err) => {
        console.log("Error while uploading the file: ", err);
      });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    updateProfile({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      stageName: this.state.stageName,
      favoriteArtist: this.state.favoriteArtist,
      email: this.state.email,
      userId: this.props.user._id,
      photoUrl: this.state.photoUrl,
    });
    this.props.updateUser();
    this.redirectToTarget("profile");
    this.setState({
      firstName: "",
      lastName: "",
      stageName: "",
      favoriteArtist: "",
      email: "",
      photoUrl: "",
    });
  };

  //Redirect after song signup
  redirectToTarget = (page) => {
    this.props.history.push(`/${page}`);
  };

  render() {
    //These placeholders are being set to the user who logs in.
    const { errorMessage } = this.state;
    const user = this.props.user;

    return (
      <div className="profile">
        <section className="profile-heading-container">
          <div className="profile-heading">
            <div className="logout-duplicate">Logout</div>
            <h1>Edit Profile</h1>
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
        {errorMessage !== "" && (
          <span className="signup-errors">{errorMessage}</span>
        )}
        <form className="edit-profile-form" onSubmit={this.handleSubmit}>
          <label className="profile-btn">
            Change Image
            <input
              type="file"
              onChange={(e) => this.handleFileUpload(e, this.props.user._id)}
            />
          </label>
          <div className="form-item">
            <label>First Name: </label>
            <input
              name="firstName"
              placeholder={user.firstName}
              onChange={this.handleChange}
              type="text"
            />
          </div>
          <div className="form-item">
            <label>Last Name: </label>
            <input
              name="lastName"
              placeholder={user.lastName}
              onChange={this.handleChange}
              type="text"
            />
          </div>
          <div className="form-item">
            <label>Stage Name: </label>
            <input
              name="stageName"
              placeholder={user.stageName}
              onChange={this.handleChange}
              type="text"
            />
          </div>
          <div className="form-item">
            <label>Favorite Artist:</label>
            <input
              name="favoriteArtist"
              placeholder={user.favoriteArtist}
              onChange={this.handleChange}
              type="text"
            />
          </div>
          <div className="form-item">
            <label>Email: </label>
            <input
              name="email"
              placeholder={user.email}
              onChange={this.handleChange}
              type="email"
            />
          </div>

          <button className="search-btn" type="submit">
            {" "}
            Update{" "}
          </button>
        </form>
        <BottomNav />
      </div>
    );
  }
}

export default EditProfile;
