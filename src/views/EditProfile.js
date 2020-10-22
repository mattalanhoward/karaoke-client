import React from "react";
import { updateProfile, handleUpload } from "../services/profileService";
// import { Redirect } from "react-router-dom"

class EditProfile extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    stageName: "",
    email: "",
    password: "",
    photoUrl: "",
    errorMessage: "",
  };

  // THIS METHOD HANDLES THE INPUT CHANGE
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  // THIS METHOD HANDLES THE PROFILE PHOTO UPLOAD
  handleFileUpload = e => {
      console.log("The file to be uploaded is: ", e.target.files[0]);

      const uploadData = new FormData();
      // photoUrl => this name has to be the same as in the model since we pass
      // req.body to .create() method when creating a new thing in '/api/things/create' POST route
      uploadData.append("photoUrl", e.target.files[0]);
      
      handleUpload(uploadData)
      .then(response => {
          console.log('response is: ', response);
          // after the console.log we can see that response carries 'secure_url' which we can use to update the state 
          this.setState({ imageUrl: response.secure_url });
        })
        .catch(err => {
          console.log("Error while uploading the file: ", err);
        });
  }


  //
  handleSubmit = (event) => {
    event.preventDefault();
    updateProfile({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      stageName: this.state.stageName,
      email: this.state.email,
      password: this.state.password,
      userId: this.props.user._id,
      photoUrl: this.state.photoUrl
    })
      this.setState({
        firstName: "",
        lastName: "",
        stageName: "",
        email: "",
        password: "",
        photoUrl: ""
      })
    // .catch((err) => console.log(err));
  };


  render() {
    const { firstName, lastName, stageName, email, photoUrl, password, errorMessage } = this.state;
    // console.log(`USER`, this.props.user._id)
    return (
      <div>
        {errorMessage !== "" && errorMessage}
        <form onSubmit={this.handleSubmit}>
        <label>First Name: </label>
          <input
            name="firstName"
            value={firstName}
            onChange={this.handleChange}
            required={true}
            type="text"
          />
          <label>Last Name: </label>
          <input
            name="lastName"
            value={lastName}
            onChange={this.handleChange}
            required={true}
            type="text"
          />
          <label>Stage Name: </label>
          <input
            name="stageName"
            value={stageName}
            onChange={this.handleChange}
            required={true}
            type="text"
          />
          <label>Email: </label>
          <input
            name="email"
            value={email}
            onChange={this.handleChange}
            required={true}
            type="email"
          />
          <label>Password: </label>
          <input
            name="password"
            type="password"
            value={password}
            onChange={this.handleChange}
            required={true}
          />
          <input 
            type="file" 
            onChange={(e) => this.handleFileUpload(e)}  
            /> 

          <button type="submit"> Update </button>
        </form>
      </div>
    );
  }
}

export default EditProfile;
