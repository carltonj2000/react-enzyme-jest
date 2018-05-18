import React, { Component } from "react";
import { Provider } from "react-redux";
import logo from "./logo.svg";
import "./App.css";
import TodoList from "./TodoList";
import { store } from "./store";
import Form from "./Form";

const Test = () => <div>Testing</div>;
const Title = ({ text }) => <div>{text}</div>;

class App extends Component {
  state = {
    button: "No!",
    title: "Start",
    mainColor: "blue",
    lifeCycle: "unmounted"
  };
  componentWillReceiveProps() {
    this.setState({ lifeCycle: "componentWillReceiveProps" });
  }
  componentDidMount() {
    this.setState({ lifeCycle: "componentDidMount" });
  }
  handleStrings(str) {
    return !!str;
  }
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
          <Title text="hi cj" />
          <ul className="Carlton">
            <li>One</li>
            <li>Two</li>
            <li>Three</li>
          </ul>
          <Test />
          <button onClick={() => this.setState({ button: "Yes!" })}>
            {this.state.button}
          </button>
          <h2 className="title">{this.state.title}</h2>
          <input
            onChange={e => this.setState({ title: e.currentTarget.value })}
          />
          <div className={this.state.mainColor}>hi</div>
          <div className="lifeCycle">{this.state.lifeCycle}</div>
          <TodoList />
          <Form />
        </div>
      </Provider>
    );
  }
}

export class Link extends Component {
  render() {
    return this.props.hide ? null : <a href={this.props.address}>Click</a>;
  }
}

export default App;
