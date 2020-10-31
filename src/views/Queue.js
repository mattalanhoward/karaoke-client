import React, { Component } from "react";
import {
  getQueueDetails,
  getQueue,
  markSongComplete,
  deleteSignup,
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
    deletedSignup: {},
  };

  //get queue then get queuedetails
  componentDidMount = async () => {
    try {
      await this.handleGetQueue();
      await this.handleQueueDetails();
    } catch (error) {
      this.setState({
        errorMessage: error,
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.songSung !== this.state.songSung) {
      this.handleQueueDetails();
    }
  }

  //Get today's Queue from Db
  handleGetQueue = async () => {
    try {
      const response = await getQueue();
      this.setState(
        {
          queueId: response.queueFromDb[0]._id,
        },
        () => {}
      );
    } catch (error) {
      this.setState({
        errorMessage: error,
      });
    }
  };

  //Get Queue details
  handleQueueDetails = async () => {
    try {
      const response = await getQueueDetails(this.state.queueId);
      this.setState(
        {
          queueDetails: response.song,
        },
        () => {}
      );
    } catch (error) {
      this.setState({
        errorMessage: error,
      });
    }
  };

  //Mark song in db as sung
  handleSongComplete = async (singerSongId) => {
    try {
      const response = await markSongComplete(singerSongId);
      this.setState(
        {
          songSung: response,
        },
        () => {}
      );
    } catch (error) {
      this.setState({
        errorMessage: error,
      });
    }
  };

  //User deletes their song from queue
  handleDeleteSignup = async (singerSongId) => {
    try {
      const response = await deleteSignup(singerSongId);
      this.setState(
        {
          queueDetails: this.state.queueDetails.filter(
            (song) => song._id !== response.deletedSignup._id
          ),
        },
        () => {}
      );
    } catch (error) {
      this.setState({
        errorMessage: error,
      });
    }
  };

  render() {
    const { queueDetails, errorMessage } = this.state;
    const user = this.props.user;
    const toggleBackground = this.state.songSung ? "Complete" : "not-complete";

    // Changes background color of songs to indicate who is up
    const nextUp = (array, index) => {
      if (index < array.length) {
        if (array[index].wasSung === true) {
          return "complete";
        }
      }
      if (index > 0 && index < array.length) {
        if (
          array[index].wasSung === false &&
          array[index - 1].wasSung === true
        ) {
          return "current";
        }
      }
      if (index > 1 && index < array.length) {
        if (
          array[index].wasSung === false &&
          array[index - 2].wasSung === true
        ) {
          return "up-next";
        }
      }
    };

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

            {queueDetails.map((signupItem, index, array) => (
              <tbody key={signupItem._id} className="song-container">
                <tr className={nextUp(array, index)}>
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
                    <div>
                      {signupItem.singer._id === user._id && (
                        <button
                          // type="button"
                          // style={{
                          //   display: "none",
                          // }}
                          onClick={() => {
                            if (
                              window.confirm(
                                `Are you sure you want to delete your signup ${signupItem.song.Title}, by ${signupItem.song.Artist}?`
                              )
                            ) {
                              {
                                this.handleDeleteSignup(signupItem._id);
                              }
                            }
                          }}
                        >
                          Delete
                        </button>
                      )}
                    </div>
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
                                `Are you sure you want to change the status of ${signupItem.singer.stageName}, ${signupItem.song.Title}, by ${signupItem.song.Artist}?`
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
