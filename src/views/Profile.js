import React from "react";
import './Profile.css'
import { getProfile } from "../services/profileService";

class Profile extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    stageName: "",
    email: "",
    password: "",
    photoUrl: "",
    errorMessage: "",
  };

  componentDidMount = () => {
    const user = this.props.user
  console.log(`USER`, user)
  getProfile({
    userId: this.props.user._id
  })
    .catch((err) => console.log(err));
  };

  render() {
    // console.log(`USER`, this.props.user._id)
    const user = this.props.user
    return (
      <div>
        <table className="profileInfo">
        <tbody>
            <tr>
                <td>Stage Name:</td>
                <td>{user.stageName}</td>
            </tr>
            <tr>
                <td>First Name:</td>
                <td>{user.firstName}</td>
            </tr>  
            <tr>
                <td>Last Name:</td>
                <td>{user.lastName}</td>
            </tr>  
            <tr>
                <td>Email:</td>
                <td>{user.email}</td>
            </tr>
            </tbody>
        </table>
      </div>
    );
  }
}

export default Profile;
