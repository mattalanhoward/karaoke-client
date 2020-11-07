import React from "react";
import { Link } from "react-router-dom";
import { updateProfile, handleUpload } from "../services/profileService";
// import { Redirect } from "react-router-dom"
import { getProfile } from "../services/profileService";
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

  //get queue then get queuedetails
  componentDidMount = async () => {
    try {
      await this.fetchData();
    } catch (error) {
      this.setState({
        errorMessage: error,
      });
    }
  };

  // Handles input change and changes the state.
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  //Get current users info
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
    this.redirectToTarget("profile");
    updateProfile({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      stageName: this.state.stageName,
      favoriteArtist: this.state.favoriteArtist,
      email: this.state.email,
      userId: this.props.user._id,
      photoUrl: this.state.photoUrl,
    });
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
    const { email, errorMessage } = this.state;
    const user = this.state;

    return (
      <div className="profile">
        <section className="profile-heading">
          <div className="logout-duplicate">Logout</div>
          <h1>Edit Profile</h1>
          <div className="logout">
            <Link to={"/"} onClick={this.props.logout()}>
              <img src={logout} alt="logout"></img>
            </Link>
          </div>
        </section>
        <section className="profile-image-container">
          {user.photoUrl !== undefined && (
            <img className="profile-image" src={user.photoUrl} alt="profile" />
          )}
        </section>

        <form className="edit-profile-form" onSubmit={this.handleSubmit}>
          <label>Change Image</label>
          <input
            type="file"
            onChange={(e) => this.handleFileUpload(e, this.props.user._id)}
          />
          {/* <label>First Name: </label> */}
          <input
            name="firstName"
            placeholder="First Name"
            onChange={this.handleChange}
            type="text"
          />
          {/* <label>Last Name: </label> */}
          <input
            name="lastName"
            placeholder="Last Name"
            onChange={this.handleChange}
            type="text"
          />
          {/* <label>Stage Name: </label> */}
          <input
            name="stageName"
            placeholder="Stage Name"
            onChange={this.handleChange}
            type="text"
          />
          <input
            name="favoriteArtist"
            placeholder="Favorite Artist"
            onChange={this.handleChange}
            type="text"
          />
          {/* <label>Email: </label> */}
          <input
            name="email"
            placeholder={email}
            onChange={this.handleChange}
            type="email"
          />

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
