import React from "react";
import { updateProfile, handleUpload } from "../services/profileService";
// import { Redirect } from "react-router-dom"

class EditProfile extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    stageName: "",
    email: "",
    photoUrl: "",
    errorMessage: "",
  };

  // THIS METHOD HANDLES THE INPUT CHANGE
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState(
      {
        [name]: value,
      },
      () => console.log(`Handle Change STATE`, this.state)
    );
  };

  // THIS METHOD HANDLES THE PROFILE PHOTO UPLOAD
  handleFileUpload = (event) => {
    console.log("The file to be uploaded is: ", event.target.files[0]);

    const uploadData = new FormData();
    // photoUrl => this name has to be the same as in the model since we pass
    uploadData.append("photoUrl", event.target.files[0]);

    handleUpload(uploadData)
      .then((response) => {
        console.log("response is: ", response);
        // after the console.log we can see that response carries 'secure_url' which we can use to update the state
        this.setState(
          {
            photoUrl: response,
          },
          () => console.log(`WHERES MY PHOTO AT YO?`, this.state)
        );
      })
      .catch((err) => {
        console.log("Error while uploading the file: ", err);
      });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(`HANDLE SUBMIT STATE`, this.state);
    updateProfile({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      stageName: this.state.stageName,
      email: this.state.email,
      userId: this.props.user._id,
      photoUrl: this.state.photoUrl,
    });
    this.setState(
      {
        firstName: "",
        lastName: "",
        stageName: "",
        email: "",
        photoUrl: "",
      },
      () => console.log(`CURRENT EDIT PROFILE STATE`, this.state)
    );
    // .catch((err) => console.log(err));
  };

  render() {
    //THESE PLACEHOLDERS ARE BEING SET TO THE USER WHO LOGS IN.
    const {
      firstName,
      lastName,
      stageName,
      email,
      photoUrl,
      errorMessage,
    } = this.props.user;
    // console.log(`USER In EDIT PROFILE`, this.props.user._id)
    console.log(`IMAGE STATE`, this.state.photoUrl);
    return (
      <div>
        {errorMessage !== "" && errorMessage}
        <form onSubmit={this.handleSubmit}>
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
          <input type="file" onChange={(e) => this.handleFileUpload(e)} />

          <button type="submit"> Update </button>
        </form>
      </div>
    );
  }
}

export default EditProfile;
