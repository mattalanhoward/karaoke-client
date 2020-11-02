import React from "react";
import { login } from "../services/userService";
import { Link } from "react-router-dom";
import "./Login.css";

class Login extends React.Component {
  state = {
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
    login({
      username: this.state.username,
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
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { email, password, errorMessage } = this.state;
    return (
      <div className="login-container">
        {errorMessage !== "" && errorMessage}
        <img
          className="logo"
          src={
            "https://res.cloudinary.com/dcod1zxnl/image/upload/v1603130425/Noda_101_Logo_l72snm.png"
          }
          alt="Noda 101 Logo"
        />
        <form onSubmit={this.handleSubmit}>
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
          <button className="nav-btns green-btn" type="submit">
            {" "}
            Login{" "}
          </button>
        </form>

        <Link to={"/signup"}>Click here to Signup</Link>
      </div>
    );
  }
}

export default Login;
