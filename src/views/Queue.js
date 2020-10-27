import React, { Component } from "react";
import { getQueueDetails } from "../services/queueService";
class Queue extends Component {
  state = {
    //this will be the item to iterate though and post name / song.
    queueDetails: [],
  };

  componentDidMount() {
    this.handleQueueDetails();
  }

  async handleQueueDetails() {
    //this is a list of singerSong ids
    console.log(`QUEUE this.props.signups: `, this.props.signups._id);
    const response = await getQueueDetails(this.props.signups._id);
    this.setState(
      {
        queueDetails: response.song,
      },
      () => {
        console.log(`QUEUE details response`, this.state.queueDetails);
      }
    );
  }

  render() {
    const songQueue = this.state.queueDetails;
    return (
      <div>
        This is the Queue Yo! Total Signups{songQueue.length}
        {songQueue.length > 0 ? (
          songQueue.map((signupItem) => (
            <div key={signupItem._id} className="song-container">
              <div>
                <h3>{signupItem.singer.stageName}</h3>
                <h3>{signupItem.song.Title}</h3>
                <p>{signupItem.song.Artist}</p>
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
