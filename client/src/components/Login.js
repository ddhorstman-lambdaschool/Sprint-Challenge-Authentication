import React from "react";
import axios from "axios";

export default class Login extends React.Component {
  state = { username: "", password: "", sender: "login" };
  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };
  setSender = ({ target: { name } }) => {
    this.setState({ sender: name });
  };
  handleSubmit = e => {
    console.log(this.props);
    e.preventDefault();
    const { sender, ...body } = this.state;
    axios
      .post(`http://localhost:5000/api/auth/${sender}`, body, {
        withCredentials: true,
      })
      .then(() => this.props.setLoginState(true))
      .then(() => this.props.history.push("/jokes"));
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type='text'
          name='username'
          value={this.state.username}
          onChange={this.handleChange}
        />
        <input
          type='password'
          name='password'
          value={this.state.password}
          onChange={this.handleChange}
        />
        {this.props.mode==="login" ? (
          <button name='login' type='submit' onClick={this.setSender}>
            Log In
          </button>
        ) : (
          <button name='register' type='submit' onClick={this.setSender}>
            Sign Up
          </button>
        )}
      </form>
    );
  }
}
