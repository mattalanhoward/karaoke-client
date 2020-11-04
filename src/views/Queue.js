import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  getQueueDetails,
  getQueue,
  markSongComplete,
  deleteSignup,
} from "../services/queueService";
// import "../App.css";
import { getProfile } from "../services/profileService";
import "./Search.css";
import "./Queue.css";
import BottomNav from "./BottomNav";
import logout from "../images/logout.png";
import cancel from "../images/cancel.png";

class Queue extends Component {
  state = {
    //this will be the item to iterate through and post name / song.
    queueId: "",
    queueDetails: [],
    errorMessage: "",
    songSung: false,
    deletedSignup: {},
    firstName: "",
    lastName: "",
    stageName: "",
    email: "",
    password: "",
    photoUrl: "",
  };

  //get queue then get queuedetails
  componentDidMount = async () => {
    try {
      await this.fetchData();
      await this.handleGetQueue();
      await this.handleQueueDetails();
    } catch (error) {
      this.setState({
        errorMessage: error,
      });
    }
  };

  //Update details when song sung is clicked
  componentDidUpdate(prevProps, prevState) {
    if (prevState.songSung !== this.state.songSung) {
      this.fetchData();
      this.handleQueueDetails();
    }
  }

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

  //Get today's Queue from Db
  handleGetQueue = async () => {
    try {
      const response = await getQueue();
      this.setState(
        {
          queueId: response.queueFromDb[0]._id,
        }
        // () => console.log(this.state.queueId)
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
      return "in-line";
    };

    return (
      <div className="queue-container">
        {errorMessage !== "" && errorMessage}
        <section className="heading">
          <div className="logout-duplicate">Logout</div>
          <img src={this.state.photoUrl} alt="profile" />
          <div className="logout">
            <Link to={"/"} onClick={this.props.logout()}>
              <img src={logout} alt="logout"></img>
            </Link>
          </div>
        </section>
        <div className="queue-header">
          <h3>Queue</h3>
          <h4>Total Signups: {queueDetails.length}</h4>
        </div>
        <section className="queue">
          {queueDetails.length > 0 ? (
            <div>
              {queueDetails.map((signupItem, index, array) => (
                <div key={signupItem._id} className="queue-song-container">
                  <div className={nextUp(array, index)}>
                    <div className="queue-item">
                      {/* <div>{index + 1}</div> */}
                      <div className="stage-name-container">
                        <h3>{signupItem.singer.stageName}</h3>
                        <h4>{signupItem.song.Title}</h4>
                        <h5>{signupItem.song.Artist}</h5>
                      </div>
                      <div className="btn-container">
                        {signupItem.singer._id === user._id && (
                          <button
                            className="cancel-song-btn"
                            onClick={() => {
                              if (
                                window.confirm(
                                  `Are you sure you want to delete your signup ${signupItem.song.Title}, by ${signupItem.song.Artist}?`
                                )
                              ) {
                                this.handleDeleteSignup(signupItem._id);
                              }
                            }}
                          >
                            Cancel
                            {/* <img
                              className="cancel-song-btn"
                              src={cancel}
                              alt="cancel"
                            /> */}
                          </button>
                        )}

                        <div className="mark-container">
                          {user.isAdmin && (
                            <button
                              className="mark-complete"
                              onClick={() => {
                                if (
                                  window.confirm(
                                    `Are you sure you want to change the status of ${signupItem.singer.stageName}, ${signupItem.song.Title}, by ${signupItem.song.Artist}?`
                                  )
                                ) {
                                  this.handleSongComplete(signupItem._id);
                                }
                              }}
                            >
                              {signupItem.wasSung
                                ? "Song Complete"
                                : "Mark As Sung"}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <h3>There are currently no signups!</h3>
          )}
        </section>
        <BottomNav />
      </div>
    );
  }
}

export default Queue;
