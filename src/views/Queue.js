import React, { Component } from "react";

class Queue extends Component {
  //   state = {
  //     singerQueue: [],
  //   };

  render() {
    const singerQueue = this.props.signups;
    const signups = this.props.newSignup;

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
