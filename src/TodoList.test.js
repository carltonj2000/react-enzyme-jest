import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";

import { TodoList } from "./TodoList";

configure({ adapter: new Adapter() });

describe("<TodoList />", () => {
  it("calls addTodo Redux action", () => {
    const props = { addTodo: jest.fn(), todos: [] };
    const wrapper = shallow(<TodoList {...props} />);
    wrapper
      .find("input")
      .simulate("change", { currentTarget: { value: "Buy milk" } });
    wrapper.find("button").simulate("click");
    expect(props.addTodo).toHaveBeenCalledWith({ text: "Buy milk" });
  });
  it("calls removeTodo Redux action", () => {
    const props = { removeTodo: jest.fn(), todos: ["hi", "there"] };
    const wrapper = shallow(<TodoList {...props} />);
    wrapper
      .find("li")
      .at(1)
      .simulate("click");
    expect(props.removeTodo).toHaveBeenCalledWith(1);
  });
  it("matches snapshot", () => {
    const props = { todos: ["hi", "there", "folks"] };
    const wrapper = shallow(<TodoList {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
