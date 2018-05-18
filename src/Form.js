import React, { Component } from "react";
import api from "./api";

export class Form extends Component {
  state = { name: "", email: "", phone: "", optIn: true };
  handleChange = str => e => {
    this.setState({ [str]: e.currentTarget.value });
  };
  handleCkBx = e => {
    this.setState(pre => ({ optIn: !pre.optIn }));
  };
  handleSubmit = e => {
    e.preventDefault();
    return api.addUser(this.state);
  };
  render() {
    return (
      <form data-testid="addUserForm" onSubmit={this.handleSubmit}>
        <input
          data-testid="name"
          onChange={this.handleChange("name")}
          value={this.state.name}
        />
        <input
          data-testid="email"
          onChange={this.handleChange("email")}
          value={this.state.email}
        />
        <input
          data-testid="phone"
          onChange={this.handleChange("phone")}
          value={this.state.phone}
        />
        <input
          data-testid="optIn"
          type="checkbox"
          onChange={this.handleCkBx}
          checked={this.state.optIn}
        />
        <button data-testid="submitButton" onClick={this.handleSubmit}>
          Submit
        </button>
      </form>
    );
  }
}

export default Form;
