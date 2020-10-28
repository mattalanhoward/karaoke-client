import React, { Component } from "react";
import {
  getQueueDetails,
  getQueue,
  markSongComplete,
} from "../services/queueService";
import "../App.css";
class Queue extends Component {
  state = {
    //this will be the item to iterate through and post name / song.
    queueId: "",
    queueDetails: [],
    errorMessage: "",
    songSung: false,
    toggleBackground: false,
  };
  handleSongComplete = this.handleSongComplete.bind(this);

  async componentDidMount() {
    try {
      //get queue then get queuedetails
      await this.handleGetQueue();
      await this.handleQueueDetails();
    } catch (error) {
      console.log(`Error when Queue component mounted`, error);
      this.setState({
        errorMessage: error,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.songSung !== this.state.songSung) {
      console.log("The Pokemons are after us!");
      this.handleQueueDetails();
    }
  }

  async handleGetQueue() {
    try {
      const response = await getQueue();
      this.setState(
        {
          queueId: response.queueFromDb[0]._id,
        },
        () => {
          console.log(`QUEUE  response`, this.state);
        }
      );
    } catch (error) {
      console.log(`Error getting queue`, error);
      this.setState({
        errorMessage: error,
      });
    }
  }

  async handleQueueDetails() {
    try {
      console.log(`QUEUE this.props.signups: `, this.state.queueId);
      const response = await getQueueDetails(this.state.queueId);
      this.setState(
        {
          queueDetails: response.song,
        },
        () => {
          console.log(`QUEUE details response`, this.state.queueDetails);
        }
      );
    } catch (error) {
      console.log(`Error getting queue details`, error);
      this.setState({
        errorMessage: error,
      });
    }
  }

  async handleSongComplete(singerSongId) {
    try {
      console.log(`QUEUE this.state.queueDetails._id: `, singerSongId);
      const response = await markSongComplete(singerSongId);
      console.log(`handleSongComplete: `, response);
      this.setState(
        {
          songSung: response,
          // [event.target.name]: event.target.value,
        },
        () => {
          console.log(`QUEUE Song Sung`, this.state);
        }
      );
    } catch (error) {
      console.log(`Error getting queue details`, error);
      this.setState({
        errorMessage: error,
      });
    }
  }

  render() {
    const { queueDetails, errorMessage } = this.state;
    const user = this.props.user;
    console.log(user.isAdmin);

    const toggleBackground = this.state.songSung ? "Complete" : "not-complete";
    return (
      <div>
        {errorMessage !== "" && errorMessage}
        Queue <br></br>Total Signups: {queueDetails.length} <br></br>{" "}
        {user.stageName}
        <img className="profile-image" src={user.photoUrl} alt="profile" />
        {queueDetails.length > 0 ? (
          <table>
            <thead>
              <tr>
                <td></td>
                <td>Singer</td>
                <td>Artist</td>
                <td>Song</td>
              </tr>
            </thead>

            {queueDetails.map((signupItem, index) => (
              <tbody key={signupItem._id} className="song-container">
                <tr
                  className={signupItem.wasSung ? `complete` : `not-complete`}
                >
                  <td>{index + 1}</td>
                  <td>
                    <h3>{signupItem.singer.stageName}</h3>
                  </td>
                  <td>
                    <h3>{signupItem.song.Title}</h3>
                  </td>
                  <td>
                    <p>{signupItem.song.Artist}</p>
                  </td>
                  <td>
                    <h3>{console.log(signupItem.wasSung)}</h3>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div>
                      {user.isAdmin && (
                        <button
                          onClick={() => {
                            if (
                              window.confirm(
                                `Are you sure you want to mark ${signupItem.song.Title}, by ${signupItem.song.Artist} as Sung?`
                              )
                            ) {
                              {
                                this.handleSongComplete(signupItem._id);
                              }
                            }
                          }}
                        >
                          {signupItem.wasSung
                            ? "Song Complete"
                            : "Mark As Sung"}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        ) : (
          <h3>There are currently no signups!</h3>
        )}
      </div>
    );
  }
}

export default Queue;
