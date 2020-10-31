import React, { Component } from "react";
import { searchArtistSongs, singerSong } from "../services/searchService";
import { BrowserRouter, Link, Switch } from "react-router-dom";
import PrivateRoute from "../components/auth/PrivateRoute";

export default class Search extends Component {
  state = {
    searchParams: "",
    searchResults: [],
    errorMessage: "",
    newSignup: {},
    signups: [],
  };

  // THIS METHOD HANDLES THE INPUT CHANGE
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.fetchSongs();
  };

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
      <div>
        <h1>Noda 101 Song List</h1>
        {errorMessage !== "" && errorMessage}
        <form onSubmit={this.handleSubmit}>
          <input
            name="searchParams"
            placeholder="Search by Song/Artist"
            onChange={this.handleChange}
            type="text"
          />
          <button type="submit"> Search </button>
        </form>

        <h2>RESULTS</h2>
        <h3># Songs: {this.state.searchResults.length}</h3>
        {this.state.searchResults.length > 0 ? (
          this.state.searchResults.map((song) => (
            <div key={song._id} className="song-container">
              <div>
                <h3>{song.Title}</h3>
                <p>{song.Artist}</p>

                <button
                  onClick={async () => {
                    if (
                      window.confirm(
                        `Are you sure you want to sing ${song.Title}, by ${song.Artist}?`
                      )
                    ) {
                      {
                        await this.props.signUp(song._id);
                        this.redirectToTarget();
                      }
                    }
                  }}
                >
                  Sign Up!
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>No Results</div>
        )}
      </div>
    );
  }
}
