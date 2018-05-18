import React from "react";
import ReactDOM from "react-dom";
import App, { Link } from "./App";
import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";

configure({ adapter: new Adapter() });

describe("<App /> shallow rendering", () => {
  it("should contain 1 p element", () => {
    const wrapper = shallow(<App />, {
      context: {},
      disableLifecycleMethods: true
    });
    //console.log(wrapper.debug());
    expect(wrapper.find("p").length).toBe(1);
    expect(wrapper.find(".App-intro").exists()).toBe(true);
    expect(wrapper.find("ul").children().length).toBe(3);
    expect(wrapper.find("ul").hasClass("Carlton")).toBe(true);
    expect(wrapper.find("h1").text()).toBe("Welcome to React");

    expect(wrapper.find('[text="hi cj"]').text()).toBe("<Title />");
    expect(wrapper.find({ alt: "logo" }).text()).toBe("");
  });
  it("matches the snapshot", () => {
    const tree = shallow(<App />);
    expect(toJson(tree)).toMatchSnapshot();
  });
  it("on button click changes text", () => {
    const wrapper = shallow(<App />);
    const button = wrapper.find("button");
    expect(button.text()).toBe("No!");
    button.simulate("click");
    expect(wrapper.find("button").text()).toBe("Yes!");
    //expect(button.text()).toBe("Yes!"); // this does not work
  });
  it("on input title changes text", () => {
    const wrapper = shallow(<App />);
    const input = wrapper.find("input");
    expect(wrapper.find(".title").text()).toBe("Start");
    input.simulate("change", { currentTarget: { value: "hi" } });
    expect(wrapper.find(".title").text()).toBe("hi");
  });
  it("updates className with new state", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(".blue").length).toBe(1);
    expect(wrapper.find(".red").length).toBe(0);
    wrapper.setState({ mainColor: "red" });
    expect(wrapper.find(".blue").length).toBe(0);
    expect(wrapper.find(".red").length).toBe(1);
  });
  it("calls componentDidMount, update div text", () => {
    jest.spyOn(App.prototype, "componentDidMount");
    const wrapper = shallow(<App />);
    expect(App.prototype.componentDidMount.mock.calls.length).toBe(1);
    expect(wrapper.find(".lifeCycle").text()).toBe("componentDidMount");
  });
  it("setProps and componentWillReceiveProps", () => {
    jest.spyOn(App.prototype, "componentWillReceiveProps");
    const wrapper = shallow(<App />);
    wrapper.setProps({ hi: "there" });
    expect(App.prototype.componentWillReceiveProps.mock.calls.length).toBe(1);
    expect(wrapper.find(".lifeCycle").text()).toBe("componentWillReceiveProps");
  });
  it("handleStrings function returns correctly", () => {
    const wrapper = shallow(<App />);
    const trueReturn = wrapper.instance().handleStrings("hi");
    expect(trueReturn).toBe(true);
    const falseReturn = wrapper.instance().handleStrings("");
    expect(falseReturn).toBe(false);
  });
});

describe("<Link />", () => {
  it("Link component accepts address props", () => {
    const wrapper = shallow(<Link address="here" />);
    expect(wrapper.instance().props.address).toBe("here");
  });
  it("a tag node renders href correclty", () => {
    const wrapper = shallow(<Link address="here" />);
    expect(wrapper.props().href).toBe("here");
  });
  it("renders according to hide", () => {
    const wrapper = shallow(<Link address="here" hide={false} />);
    expect(wrapper.find("a").length).toBe(1);
    wrapper.setProps({ hide: true });
    expect(wrapper.get(0)).toBeNull();
  });
});

describe("<App /> mount rendering", () => {
  it("h1 has correct test", () => {
    const wrapper = mount(<App />);
    expect(wrapper.find("h1").text()).toBe("Welcome to React");
    wrapper.unmount();
  });
  it("matches the snapshot", () => {
    const tree = mount(<App />);
    expect(toJson(tree)).toMatchSnapshot();
    tree.unmount();
  });
});
