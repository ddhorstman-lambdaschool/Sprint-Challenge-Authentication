import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import "./App.scss";
import JokeList from "./components/JokeList";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Nav from "./components/Nav";

export default function App() {
  const [isLoggedIn, setLoginState] = React.useState(
    document.cookie.includes("sprint-challenge-authentication-session")
  );
  return (
    <Router>
      <Nav isLoggedIn={isLoggedIn} />
      <Route exact path='/' render={() => <Redirect to='/login' />} />
      <Route
        exact
        path='/login'
        render={p => (
          <Login {...p} mode='login' setLoginState={setLoginState} />
        )}
      />
      <Route
        exact
        path='/register'
        render={p => (
          <Login {...p} mode='register' setLoginState={setLoginState} />
        )}
      />
      <Route exact path='/jokes' component={JokeList} />
      <Route
        exact
        path='/logout'
        render={p => <Logout {...p} setLoginState={setLoginState} />}
      />
    </Router>
  );
}
