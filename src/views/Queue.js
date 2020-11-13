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
import whiteCancel from "../images/white-cancel.png";
import whiteCheck from "../images/white-check-mark.png";
import check from "../images/check-mark.png";
import undo from "../images/undo-white.png";
import logo from "../images/Noda_101_Logo_Cropped.png";
import ProgressBar from "react-scroll-progress-bar";
import Zoom from "react-reveal/Zoom";
import Fade from "react-reveal/Fade";
import TransitionGroup from "react-transition-group/TransitionGroup";

class Queue extends Component {
  groupProps = {
    appear: false,
    enter: true,
    exit: true,
  };
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
        () => {
          console.log(`SONG COMPLETE RESPONSE`, this.state);
        }
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
    // console.log(`Queue Details in Queue.js`, queueDetails);
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

    //Queue length of songs yet to be sung.
    const filteredSung = queueDetails.filter((sung) => {
      return !sung.wasSung;
    });

    console.log(filteredSung);

    return (
      <div className="queue-container">
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
        </section>
        <div className="queue-header">
          <h3>Queue</h3>
          <h4>Total Signups: {filteredSung.length}</h4>
          {errorMessage !== "" && errorMessage}
          <ProgressBar height="3px" bgcolor="#f73cab" duration="0.2" />{" "}
        </div>

        <section className="queue">
          {queueDetails.length > 0 ? (
            <div className="queue-list-container">
              {console.log(queueDetails)}
              {/* {
                const filteredSung = 
                queueDetails.filter((sung) => {
                  sung.wasSung;
                })
              } */}
              <TransitionGroup {...this.groupProps}>
                {queueDetails.map((signupItem, index, array) => (
                  //Container for each item.  Place effects here.
                  <Fade duration={1000} key={signupItem._id} collapse right>
                    <div key={signupItem._id} className="queue-song-container">
                      <Fade duration={1000} key={signupItem._id}>
                        <div className={nextUp(array, index)}>
                          <div className="queue-item">
                            {/* <div>{index + 1}</div> */}
                            <div className="stage-name-container">
                              <h3>{signupItem.singer.stageName}</h3>
                              <h4>{signupItem.song.Title}</h4>
                              <h5>{signupItem.song.Artist}</h5>
                            </div>
                            <div className="btn-container">
                              {/* {console.log(signupItem.wasSung)} */}
                              {signupItem.singer._id === user._id &&
                                !signupItem.wasSung && (
                                  <button
                                    className="song-btn-container"
                                    onClick={() => {
                                      this.handleDeleteSignup(signupItem._id);
                                    }}
                                  >
                                    {/* Toggle icon color based on in-line status */}
                                    {nextUp(array, index) === "in-line" ? (
                                      <img
                                        className="cancel-song-btn"
                                        src={whiteCancel}
                                        alt="white-cancel"
                                      />
                                    ) : (
                                      <img
                                        className="cancel-song-btn"
                                        src={cancel}
                                        alt="cancel"
                                      />
                                    )}
                                  </button>
                                )}

                              <div className="mark-container">
                                {user.isAdmin && (
                                  <button
                                    className="song-btn-container"
                                    onClick={() => {
                                      {
                                        this.handleSongComplete(signupItem._id);
                                      }
                                    }}
                                  >
                                    {!signupItem.wasSung ? (
                                      <img
                                        className="cancel-song-btn"
                                        src={check}
                                        alt="check"
                                      />
                                    ) : nextUp(array, index) === "in-line" ? (
                                      <img
                                        className="cancel-song-btn"
                                        src={whiteCheck}
                                        alt="check"
                                      />
                                    ) : (
                                      <img
                                        className="cancel-song-btn"
                                        src={undo}
                                        alt="undo"
                                      />
                                    )}
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Fade>
                    </div>{" "}
                  </Fade>
                  // closing div for queue-song-container
                ))}
              </TransitionGroup>
            </div>
          ) : (
            <div>
              <h3>There are currently no signups!</h3>
              <img className="logo-queue" src={logo} alt="logo" />
            </div>
          )}
        </section>
        <BottomNav />
      </div>
    );
  }
}

export default Queue;

//error when no one has been marked sung.  Impossible to get buttons for dj to mark things sung.
//Need to account for that.  Otherwise this is good code for lots of conditional buttons
{
  /* <div className="mark-container">
{user.isAdmin &&
  nextUp(array, index) !== "in-line" && (
    <button
      className="song-btn-container"
      onClick={() => {
        {
          this.handleSongComplete(
            signupItem._id
          );
        }
      }}
    >
      {signupItem.wasSung ? (
        <img
          className="cancel-song-btn"
          src={undo}
          alt="undo"
        />
      ) : nextUp(array, index) !== "in-line" ? (
        <img
          className="cancel-song-btn"
          src={check}
          alt="check"
        />
      ) : (
        <img
          className="hidden-cancel-song-btn"
          src={whiteCheck}
          alt="check"
        />
      )}
    </button>
  )}
</div> */
}
