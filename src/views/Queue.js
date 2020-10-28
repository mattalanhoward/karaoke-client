import React, { Component } from "react";
import { getQueueDetails, getQueue } from "../services/queueService";
class Queue extends Component {
  state = {
    //this will be the item to iterate through and post name / song.
    queueId: "",
    queueDetails: [],
  };

  async componentDidMount() {
    try {
      //get queue then get queuedetails
      await this.handleGetQueue();
      await this.handleQueueDetails();
    } catch (error) {
      console.log(`Error when Queue component mounted`, error);
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
          console.log(`QUEUE  response`, this.state.queueId);
        }
      );
    } catch (error) {
      console.log(`Error while getting the Queue`, error);
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
      console.log(`Error getting queue details `, error);
    }
  }

  render() {
    const songQueue = this.state.queueDetails;
    return (
      <div>
        {/* Queue <br></br>Total Signups: {songQueue.length} */}
        {songQueue.length > 0 ? (
          <table>
            <thead>
              <tr>
                <td></td>
                <td>Singer</td>
                <td>Artist</td>
                <td>Song</td>
              </tr>
            </thead>

            {songQueue.map((signupItem, index) => (
              <tbody key={signupItem._id} className="song-container">
                <tr>
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
                </tr>
              </tbody>
            ))}
          </table>
        ) : (
          <h1>There are currently no signups!</h1>
        )}
      </div>
    );
  }
}

export default Queue;
