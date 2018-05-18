import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { addTodo, removeTodo } from "./store";

export class TodoList extends Component {
  state = { input: "" };
  handleClick = i => () => {
    this.props.removeTodo(i);
  };
  handleChange = e => {
    this.setState({ input: e.currentTarget.value });
  };
  handleSubmit = () => {
    this.props.addTodo({ text: this.state.input });
    this.setState({ input: "" });
  };
  render() {
    return (
      <Fragment>
        <ul>
          {this.props.todos.map(({ text }, i) => (
            <li key={i} onClick={this.handleClick(i)}>
              {text}
            </li>
          ))}
        </ul>
        <input onChange={this.handleChange} value={this.state.input} />
        <button onClick={this.handleSubmit}>Add Todo</button>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ currentList: { todos } }) => ({ todos });

const bindActionsToDispatch = dispatch => ({
  addTodo: todo => dispatch(addTodo(todo)),
  removeTodo: id => dispatch(removeTodo(id))
});

const TodoListContainer = connect(mapStateToProps, bindActionsToDispatch)(
  TodoList
);

export default TodoListContainer;
