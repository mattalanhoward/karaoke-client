import React from "react";
import { updateProfile, handleUpload } from "../services/profileService";
// import { Redirect } from "react-router-dom"
import { getProfile } from "../services/profileService";
class EditProfile extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    stageName: "",
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
      email: this.state.email,
      userId: this.props.user._id,
      photoUrl: this.state.photoUrl,
    });
    this.setState({
      firstName: "",
      lastName: "",
      stageName: "",
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
    const {
      firstName,
      lastName,
      stageName,
      email,
      photoUrl,
      errorMessage,
    } = this.state;

    return (
      <div>
        {errorMessage !== "" && errorMessage}
        <form onSubmit={this.handleSubmit}>
          <label>Profile Image</label>
          <input
            type="file"
            onChange={(e) => this.handleFileUpload(e, this.props.user._id)}
          />
          <label>First Name: </label>
          <input
            name="firstName"
            placeholder={firstName}
            onChange={this.handleChange}
            type="text"
          />
          <label>Last Name: </label>
          <input
            name="lastName"
            placeholder={lastName}
            onChange={this.handleChange}
            type="text"
          />
          <label>Stage Name: </label>
          <input
            name="stageName"
            placeholder={stageName}
            onChange={this.handleChange}
            type="text"
          />
          <label>Email: </label>
          <input
            name="email"
            placeholder={email}
            onChange={this.handleChange}
            type="email"
          />

          <button type="submit"> Update </button>
        </form>
      </div>
    );
  }
}

export default EditProfile;
