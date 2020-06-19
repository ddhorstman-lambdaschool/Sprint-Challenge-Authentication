import React from "react";
import axios from "axios";

export default class Login extends React.Component {
  state = { username: "", password: "", sender: "login", errorText: "" };
  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };
  setSender = ({ target: { name } }) => {
    this.setState({ sender: name });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { username, password, sender } = this.state;
    axios
      .post(
        `http://localhost:5000/api/auth/${sender}`,
        { username, password },
        {
          withCredentials: true,
        }
      )
      .then(() => this.props.setLoginState(true))
      .then(() => this.props.history.push("/jokes"))
      .catch(e => {
        this.setState({ errorText: e.response?.data.message });
      });
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
        {this.props.mode === "login" ? (
          <button name='login' type='submit' onClick={this.setSender}>
            Log In
          </button>
        ) : (
          <button name='register' type='submit' onClick={this.setSender}>
            Sign Up
          </button>
        )}
        {this.state.errorText && (
          <div className='errorText'>{this.state.errorText}</div>
        )}
      </form>
    );
  }
}
