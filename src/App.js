import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import "./App.css";
import AnonRoute from "./components/auth/AnonRoute";
import PrivateRoute from "./components/auth/PrivateRoute";
import { validateSession } from "./services/userService";
import Home from "./views/Home";
import Login from "./views/Login";
import Signup from "./views/Signup";
import EditProfile from "./views/EditProfile";
import Profile from "./views/Profile";
import Search from "./views/Search";
import Queue from "./views/Queue";
import { singerSong, addSongToQueue } from "./services/searchService";
import BottomNav from "./views/BottomNav";
import BarDisplay from "./views/BarDisplay";
import { getProfile } from "./services/profileService";

class App extends React.Component {
  state = {
    authenticated: false,
    user: {},
    newSignup: {},
    signups: [],
  };

  componentDidMount = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      validateSession(accessToken)
        .then((response) => {
          console.log(response, "RESPONSE");
          this.authenticate(response.session.userId);
        })
        .catch((err) => console.log(err));
    }
  };

  componentDidUpdate(previousProps, previousState) {
    const userProfileChanged =
      previousState.user.stageName !== this.state.user.stageName;
    if (userProfileChanged) {
      this.handleUpdatedUser();
    }
  }

  //lift state for song sign up
  handleSignup = async (songId) => {
    const userId = this.state.user._id;

    const singerSongResponse = await singerSong(userId, songId);
    const queueResponse = await addSongToQueue(singerSongResponse);

    this.setState(
      {
        newSignup: singerSongResponse,
        signups: queueResponse.updatedQueue,
      },
      () => console.log(`CURRENT SIGNUPS STATE`, this.state.signups)
    );
  };

  //lift state for updated user to reduce db calls
  handleUpdatedUser = async () => {
    try {
      const updatedUser = await getProfile({
        userId: this.state.user._id,
      });
      this.setState(
        {
          user: updatedUser,
          errorMessage: "",
        },
        () => {
          console.log(`CURRENT USER STATE`, this.state.user);
        }
      );
    } catch (error) {
      this.setState({
        errorMessage: error,
      });
    }
  };

  authenticate = (user) => {
    this.setState({
      authenticated: true,
      user,
    });
  };

  handleLogout = () => {
    localStorage.clear();
    this.setState({
      authenticated: false,
      user: {},
    });
  };

  render() {
    const { authenticated } = this.state;

    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <AnonRoute
              exact
              path="/"
              user={this.state.user}
              authenticated={authenticated}
              component={Home}
            />
            <AnonRoute
              exact
              path="/signup"
              authenticated={authenticated}
              authenticate={this.authenticate}
              component={Signup}
            />
            <AnonRoute
              exact
              path="/login"
              authenticated={authenticated}
              authenticate={this.authenticate}
              component={Login}
            />
            <PrivateRoute
              exact
              path="/profile"
              user={this.state.user}
              authenticated={authenticated}
              logout={() => this.handleLogout}
              component={Profile}
            />
            <PrivateRoute
              exact
              path="/editprofile"
              user={this.state.user}
              authenticated={authenticated}
              updateUser={this.handleUpdatedUser}
              logout={() => this.handleLogout}
              component={EditProfile}
            />
            <PrivateRoute
              exact
              path="/search"
              user={this.state.user}
              authenticated={authenticated}
              component={Search}
              signups={this.state.signups}
              newSignup={this.state.newSignup}
              signUp={this.handleSignup}
              logout={() => this.handleLogout}
            />
            <PrivateRoute
              exact
              path="/BarDisplay"
              user={this.state.user}
              authenticated={authenticated}
              component={BarDisplay}
              logout={() => this.handleLogout}
            />
            <PrivateRoute
              exact
              path="/queue"
              user={this.state.user}
              authenticated={authenticated}
              component={Queue}
              signups={this.state.signups}
              newSignup={this.state.newSignup}
              signUp={this.handleSignup}
              logout={() => this.handleLogout}
            />
            <PrivateRoute
              user={this.state.user}
              authenticated={authenticated}
              component={BottomNav}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
