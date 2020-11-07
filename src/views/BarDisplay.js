import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getQueueDetails, getQueue } from "../services/queueService";
// import "../App.css";
import { getProfile } from "../services/profileService";
import "./Search.css";
import "./Queue.css";
import BottomNav from "./BottomNav";
import logout from "../images/logout.png";
import cancel from "../images/cancel.png";
import check from "../images/check-mark.png";
import undo from "../images/undo.png";
import Queue from "./Queue";
import "./BarDisplay.css";

class BarDisplay extends Component {
  state = {
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
    authenticated: "",
    currentSinger: {},
  };

  //get DJ, CurrentSinger, NextUp
  componentDidMount = async () => {
    try {
      await this.handleGetQueue();
      await this.handleQueueDetails();
      // await this.handleCurrentSinger();
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
      this.setState({
        queueId: response.queueFromDb[0]._id,
      });
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

  // Get Current Singer/Song to display in bar-left
  // handleCurrentSinger = async () => {
  //   const queue = this.state.queueDetails;
  //   let currentSingerSong;
  //   queue.map((queueItem, index) => {
  //     if (queue[index].wasSung === false && queue[index - 1].wasSung === true) {
  //       currentSingerSong = queue[index];
  //     }
  //   });
  //   this.setState({
  //     currentSinger: currentSingerSong,
  //   });
  // };

  handleCurrentSinger = () => {};

  render() {
    const {
      errorMessage,
      authenticated,
      queueDetails,
      queueId,
      currentSinger,
    } = this.state;

    console.log(`SINGER`, currentSinger.singer);
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
          // this.setState(
          //   {
          //     currentSinger: array[index].singer.stageName,
          //   },
          //   () => {
          //     console.log(`Current Singer State`, this.state.currentSinger);
          //   }
          // );
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

    const getCurrentSinger = (array, index) => {
      if (index > 0 && index < array.length) {
        if (
          array[index].wasSung === false &&
          array[index - 1].wasSung === true
        ) {
          return array[index].singer.stageName;
        }
      }
    };

    const getNextUp = (array, index) => {
      if (index > 1 && index < array.length) {
        if (
          array[index].wasSung === false &&
          array[index - 2].wasSung === true
        ) {
          return array[index].singer.stageName;
        }
      }
    };

    return (
      <div className="bar-display-container">
        <section className="bar-left">
          {/* <Queue
            user={this.props.user}
            authenticated={authenticated}
            component={Queue}
            signups={this.state.signups}
            newSignup={this.state.newSignup}
            signUp={this.handleSignup}
            logout={() => this.handleLogout}
          /> */}
          <div className="queue-header">
            <h3>Queue</h3>
            <h4>Total Signups: {queueDetails.length}</h4>
            {errorMessage !== "" && errorMessage}
          </div>
          <section className="queue">
            {queueDetails.length > 0 ? (
              <div>
                {queueDetails.map((signupItem, index, array) => (
                  <div key={signupItem._id} className="queue-song-container">
                    <div className={nextUp(array, index)}>
                      <div className="queue-item">
                        <div className="stage-name-container">
                          <h3>{signupItem.singer.stageName}</h3>
                          <h4>{signupItem.song.Title}</h4>
                          <h5>{signupItem.song.Artist}</h5>
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
        </section>
        <section className="bar-right">
          <div className="bar-right-item">Dj Scribble</div>
          <div className="bar-right-item">
            {queueDetails.length > 0 ? (
              <div>
                <h1>On Stage</h1>
                {queueDetails.map((signupItem, index, array) => (
                  <div key={signupItem._id} className="queue-song-container">
                    <div className="stage-name-container">
                      <div>{getCurrentSinger(array, index)}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <h3>There are currently no signups!</h3>
            )}
          </div>
          <div className="bar-right-item">
            {queueDetails.length > 0 ? (
              <div>
                <h1>Get Ready, You're Next!</h1>
                {queueDetails.map((signupItem, index, array) => (
                  <div key={signupItem._id} className="queue-song-container">
                    <div className="stage-name-container">
                      <div>{getNextUp(array, index)}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <h3>There are currently no signups!</h3>
            )}
          </div>
        </section>
        {/* <BottomNav /> */}
      </div>
    );
  }
}

export default BarDisplay;
