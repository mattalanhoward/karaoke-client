import React from "react";
import { updateProfile } from "../services/profileService";
import { Redirect } from "react-router-dom"

class EditProfile extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    stageName: "",
    email: "",
    password: "",
    errorMessage: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    // event.preventDefault();
    updateProfile({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      stageName: this.state.stageName,
      email: this.state.email,
      password: this.state.password,
      userId: this.props.user._id,
      
    })
      .catch((err) => console.log(err));
  };


  render() {
    const { firstName, lastName, stageName, email, password, errorMessage } = this.state;
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
          <button type="submit"> Update </button>
        </form>
      </div>
    );
  }
}

export default EditProfile;
