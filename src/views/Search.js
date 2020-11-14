import React, { Component } from "react";
import { searchArtistSongs } from "../services/searchService";
import { Link } from "react-router-dom";
import BottomNav from "./BottomNav";
import "./Search.css";
import "../App.css";
import { getProfile } from "../services/profileService";
import signupImage from "../images/signup.png";
import logout from "../images/logout.png";
import logo from "../images/Noda_101_Logo_Cropped.png";
import ProgressBar from "react-scroll-progress-bar";
import Pulse from "react-reveal/Pulse";
import Fade from "react-reveal/Fade";

export default class Search extends Component {
  state = {
    searchParams: "johnny cash",
    searchResults: [],
    errorMessage: "",
    newSignup: {},
    signups: [],
    firstName: "",
    lastName: "",
    stageName: "",
    email: "",
    password: "",
    photoUrl:
      "https://res.cloudinary.com/dcod1zxnl/image/upload/v1603130425/Noda_101_Logo_l72snm.png",
  };

  //get updated user info
  componentDidMount = async () => {
    try {
      await this.fetchData();
    } catch (error) {
      this.setState({
        errorMessage: error,
      });
    }
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

  //Handles input change
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  //Get songs when user clicks submit
  handleSubmit = (event) => {
    event.preventDefault();
    this.fetchSongs();
  };

  //Call db with searchParams and set state to results
  fetchSongs = async () => {
    const response = await searchArtistSongs(this.state.searchParams);
    this.setState({
      searchResults: response,
    });
  };

  //Redirect after song signup
  redirectToTarget = () => {
    this.props.history.push(`/queue`);
  };

  render() {
    const { errorMessage } = this.props.user;

    return (
      <div className="search-container">
        {errorMessage !== "" && errorMessage}
        <section className="heading">
          <div className="logout-duplicate">
            <Link to={"/"} onClick={this.props.logout()}>
              <img className="icon" src={logout} alt="logout"></img>
            </Link>
          </div>
          <img src={this.state.photoUrl} alt="profile" />
          <div className="logout">
            <Link to={"/"} onClick={this.props.logout()}>
              <img className="icon" src={logout} alt="logout"></img>
            </Link>
          </div>
          {/* <Link to="/bardisplay">Bar Display</Link> */}
        </section>
        <section className="search">
          <div className="search-bar">
            {/* <h3>NODA 101 Song List</h3> */}
            <form onSubmit={this.handleSubmit}>
              <input
                className="search-params"
                name="searchParams"
                placeholder="Search by Song/Artist"
                onChange={this.handleChange}
                type="text"
              />
              {/* <button className="search-btn" type="submit">
                {" "}
                Search{" "}
              </button> */}
            </form>
            <h5>Search Results: {this.state.searchResults.length}</h5>
          </div>
          <ProgressBar height="3px" bgcolor="#f73cab" duration="0.2" />{" "}
          {this.state.searchResults.length > 0 ? (
            //place effects here for search results animation
            <Fade duration={1500}>
              <section className="results-container">
                {this.state.searchResults.map((song) => (
                  <div key={song._id} className="song-container">
                    <div className="results">
                      <h4>{song.Title}</h4>
                      <p>{song.Artist}</p>
                    </div>
                    <button
                      className="signup-btn"
                      onClick={async () => {
                        {
                          await this.props.signUp(song._id);
                          this.redirectToTarget();
                        }
                      }}
                    >
                      <img
                        className="icon"
                        src={signupImage}
                        alt="signup icon"
                      />
                    </button>

                    {/* <button
                      className="signup-btn"
                      onClick={async () => {
                        if (
                          window.confirm(
                            `Are you sure you want to sing ${song.Title}, by ${song.Artist}?`
                          )
                        ) {
                          await this.props.signUp(song._id);
                          this.redirectToTarget();
                        }
                      }
                      }
                    >
                      <img
                        className="icon"
                        src={signupImage}
                        alt="signup icon"
                      />
                    </button> */}
                  </div>
                ))}
              </section>
            </Fade>
          ) : (
            <div className="search-container">
              <Pulse duration={2000} forever={true}>
                <img className="logo-search" src={logo} alt="logo" />
              </Pulse>
            </div>
          )}
        </section>
        <BottomNav />
      </div>
    );
  }
}
