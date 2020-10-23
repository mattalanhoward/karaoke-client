import React, { Component } from 'react'
import { searchArtistSongs } from '../services/searchService'

export default class Search extends Component {
    state = {
        searchParams: "",
        searchResults : [],
        errorMessage: ""
    }


  // THIS METHOD HANDLES THE INPUT CHANGE
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, ()=> console.log(`Handle Change STATE`, this.state));
  };

  handleSubmit = (event) =>{
      event.preventDefault();
      this.fetchSongs();
  }

  async fetchSongs () {
    console.log(`HANDLE SUBMIT SEARCH`, this.state.searchParams)
    const response = await searchArtistSongs(this.state.searchParams);
    console.log(`RESPONSE SEARCH`, response)
    this.setState({
        searchResults: response,
      }, ()=> console.log(`CURRENT SEARCH STATE`, this.state))
  }



    render() {
       const { errorMessage } = this.props.user
       const { results } = this.state.searchResults
       
        return (
            <div>
               <h1>Noda 101 Song List</h1> 
               {errorMessage !== "" && errorMessage}
        <form onSubmit={this.handleSubmit}>
          <input
            name="searchParams"
            placeholder= "Search by Song"
            onChange={this.handleChange}
            type="text"
          />
          <button type="submit"> Search </button>
        </form>

        <h2>RESULTS</h2>
        <h3># Songs: {this.state.searchResults.length}</h3>
        {this.state.searchResults.length > 0 ? 
        this.state.searchResults.map((song) => (
            <div key={song._id} className="song-container">
              <div>
                <h5>{song.Title}</h5>
                <p>
                  {song.Artist}
                </p>
              </div>
            </div>
          )) : 
          <div>No Results</div>}

            </div>
        )
    }
}
