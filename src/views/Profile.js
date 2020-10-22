import React from "react";
import './Profile.css'
import { getProfile, updateProfile } from "../services/profileService";

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


  componentDidMount() {
    const user = this.props.user
    this.setState({
      firstName: user.firstName,
    })
    console.log("I am in the mount")
    this.fetchData();
  }

  // componentDidUpdate(previousProps, previousState) {
  //   const userChanged =
  //     previousState.stageName !== this.state.stageName;
  //   if (userChanged) {
  //     this.fetchData();
  //   }
  // }

  async fetchData () {
    const user = this.props.user
    console.log(`FETCH DATA (USER)`, user)
    const updatedUser = await getProfile({
      userId: this.props.user._id
    })
    this.setState({
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      stageName: updatedUser.stageName,
      email: updatedUser.email,
      password: updatedUser.password,
      photoUrl: updatedUser.photoUrl,
      errorMessage: "",
    }, () => console.log("CURRENT STATE", this.state))
  }

  render() {
    // console.log(`USER`, this.props.user._id)
    const user = this.state
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
