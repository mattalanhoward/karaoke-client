import React, { Component } from "react";

class Queue extends Component {
  state = {
    singerQueue: [],
  };

  render() {
    return (
      <div>
        This is the Queue Yo!
        {this.state.singerQueue.length > 0 ? (
          this.state.singerQueue.map((signupQueue) => (
            <div key={signupQueue._id} className="song-container">
              <div>
                <h3>{signupQueue.singer.stageName}</h3>
                <p>{signupQueue.song.Artist}</p>
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
