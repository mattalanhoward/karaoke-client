import React, { Component } from "react";
import { searchArtistSongs } from "../services/searchService";
import { Link } from "react-router-dom";
import BottomNav from "./BottomNav";
import "./Search.css";
import "../App.css";
import { getProfile } from "../services/profileService";
import signupImage from "../images/signup.png";
import logout from "../images/logout.png";
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
          <div className="logout-duplicate">Logout</div>
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
            <h3>Noda 101 Song List</h3>
            <form onSubmit={this.handleSubmit}>
              <input
                name="searchParams"
                placeholder="Search by Song/Artist"
                onChange={this.handleChange}
                type="text"
              />
              <button className="search-btn" type="submit">
                {" "}
                Search{" "}
              </button>
            </form>
            <h5>Search Results: {this.state.searchResults.length}</h5>
          </div>
          {/* {this.state.searchResults.length > 0 ? ( */}
          <section className="results-container">
            {
              this.state.searchResults.map((song) => (
                <div key={song._id} className="song-container">
                  <div className="results">
                    <h4>{song.Title}</h4>
                    <p>{song.Artist}</p>
                  </div>
                  <button
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
                    }}
                  >
                    <img className="icon" src={signupImage} alt="signup icon" />
                  </button>
                </div>
              ))
              /* ) : (
            <div>No Results</div>
          ) */
            }
          </section>
        </section>
        <BottomNav />
      </div>
    );
  }
}
