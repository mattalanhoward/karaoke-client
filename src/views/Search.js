import React, { Component } from "react";
import { searchArtistSongs, singerSong } from "../services/searchService";
import { BrowserRouter, Link, Switch } from "react-router-dom";
import PrivateRoute from "../components/auth/PrivateRoute";
import Queue from "../views/Queue";

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
    this.setState(
      {
        [name]: value,
      },
      () => console.log(`Handle Change STATE`, this.state)
    );
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.fetchSongs();
  };

  async fetchSongs() {
    console.log(`HANDLE SUBMIT SEARCH`, this.state.searchParams);
    const response = await searchArtistSongs(this.state.searchParams);
    console.log(`RESPONSE SEARCH`, response);
    this.setState(
      {
        searchResults: response,
      },
      () => console.log(`CURRENT SEARCH STATE`, this.state)
    );
  }

  async handleSignup(songId) {
    console.log(`LETS GO TO THE QUEUEUEUEUEU`);
    console.log(`SONG ID`, songId);
    const userId = this.props.user._id;
    console.log(`USER ID`, userId);

    const response = await singerSong(userId, songId);
    const signUpArr = [...this.state.signups];
    signUpArr.push(response);
    // console.log(`SINGER SONG RESPONSE`, response);
    this.setState(
      {
        newSignup: response,
        signups: signUpArr,
      },
      () => console.log(`CURRENT SIGNUPS STATE`, this.state.signups)
    );
  }

  render() {
    const { errorMessage } = this.props.user;
    //    const { results } = this.state.searchResults

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
                  onClick={() => {
                    if (
                      window.confirm(
                        `Are you sure you want to sing ${song.Title}, by ${song.Artist}?`
                      )
                    ) {
                      {
                        this.handleSignup(song._id);
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
