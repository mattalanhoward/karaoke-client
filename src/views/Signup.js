import React from "react";
import { signup } from "../services/userService";
import { Link } from "react-router-dom";
import "./Signup.css";

class Signup extends React.Component {
  state = {
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
    event.preventDefault();
    signup({
      stageName: this.state.stageName,
      email: this.state.email,
      password: this.state.password,
    })
      .then((response) =>
        response.accessToken
          ? (localStorage.setItem("accessToken", response.accessToken),
            this.props.authenticate(response.user),
            this.props.history.push("/search"))
          : this.setState({
              errorMessage: response.errorMessage,
            })
      )
      .catch((err) => console.log(err));
  };

  render() {
    const { stageName, email, password, errorMessage } = this.state;

    return (
      <div className="signup-container">
        <img
          className="logo"
          src={
            "https://res.cloudinary.com/dcod1zxnl/image/upload/v1603130425/Noda_101_Logo_l72snm.png"
          }
          alt="Noda 101 Logo"
        />
        <span className="signup-errors">
          {errorMessage !== "" && errorMessage}
        </span>
        <form onSubmit={this.handleSubmit}>
          {/* <label>Stage Name: </label> */}
          <input
            name="stageName"
            value={stageName}
            onChange={this.handleChange}
            required={true}
            type="text"
            placeholder="Stage Name"
          />
          {/* <label>Email: </label> */}
          <input
            name="email"
            value={email}
            onChange={this.handleChange}
            required={true}
            type="email"
            placeholder="Email"
          />
          {/* <label>Password: </label> */}
          <input
            name="password"
            type="password"
            value={password}
            onChange={this.handleChange}
            required={true}
            placeholder="Password"
          />
          {/* <input
            name="password"
            type="password"
            value={password}
            onChange={this.handleChange}
            required={true}
            placeholder="Confirm Password"
          /> */}
          <button className="nav-btns green-btn" type="submit">
            {" "}
            Sign up{" "}
          </button>
        </form>

        <Link to={"/login"}>Already Registered? Login</Link>
      </div>
    );
  }
}

export default Signup;
