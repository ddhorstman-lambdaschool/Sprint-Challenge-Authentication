import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import JokeList from "./components/JokeList";
import Login from "./components/Login";
import Logout from "./components/Logout";

export default function App() {
  return (
    <Router>
      <Route exact path='/' />
      <Route exact path='/login' component={Login} />
      <Route exact path='/jokes' component={JokeList} />
      <Route exact path="/logout" component={Logout} />
    </Router>
  );
}
