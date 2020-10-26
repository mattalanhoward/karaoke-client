import React, { Component } from "react";
import { addSongToQueue } from "../services/queueService";
class Queue extends Component {
  state = {
    singerQueue: [],
  };

  //FETCH UPDATED QUEUE

  // componentDidUpdate() {
  //   console.log("THE QUEUE COMPONENENT UPDATED");
  //   this.handleAddToQueue();
  // }

  // async handleAddToQueue() {
  //   const response = await addSongToQueue(this.props.newSignup);

  //   this.setState(
  //     {
  //       singerQueue: response,
  //     },
  //     () => console.log(`CURRENT STATE OF SINGER QUEUE`, this.state)
  //   );
  // }

  render() {
    const singerQueue = this.state.singerQueue;
    const signups = this.props.newSignup;
    console.log(`NEW SIGNUP`, signups);
    return (
      <div>
        This is the Queue Yo!
        {singerQueue.length > 0 ? (
          singerQueue.map((signupQueue) => (
            <div key={signupQueue._id} className="song-container">
              <div>
                <h3>{signupQueue.singer.stageName}</h3>
                <p>{signupQueue.song.Title}</p>
              </div>
            </div>
          ))
        ) : (
          <div>Be the first to sign up!</div>
        )}
      </div>
    );
  }
}

export default Queue;
