import React from "react";
import { BrowserRouter, Link, Switch } from "react-router-dom";
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

class App extends React.Component {
  state = {
    authenticated: false,
    user: {},
    newSignup: {},
    signups: [],
  };
  handleSignup = this.handleSignup.bind(this);

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

  //when SIGNUP button is CLicked....
  async handleSignup(songId) {
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
  }

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
          <nav>
            {/* {!authenticated && <Link to="/"> Home </Link>} */}
            {authenticated && <Link to="/profile"> Profile </Link>}
            {authenticated && <Link to="/editprofile"> Edit Profile </Link>}
            {authenticated && <Link to="/search"> Search </Link>}
            {authenticated && <Link to="/queue"> Queue </Link>}

            {!authenticated && <Link to="/login"> Login </Link>}
            {!authenticated && <Link to="/signup"> Signup </Link>}
            {authenticated && (
              <Link to={"/"} onClick={this.handleLogout}>
                Logout
              </Link>
            )}
          </nav>
          <AnonRoute
            exact
            path="/"
            user={this.state.user}
            authenticated={authenticated}
            component={Home}
          />
          <Switch>
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
              component={Profile}
            />
            <PrivateRoute
              exact
              path="/editprofile"
              user={this.state.user}
              authenticated={authenticated}
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
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
