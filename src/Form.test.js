import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";

import { Form } from "./Form";
import api from "./api";

configure({ adapter: new Adapter() });

const updateInput = (wrapper, instance, newValue) => {
  const input = wrapper.find(instance);
  input.simulate("change", { currentTarget: { value: newValue } });
  return wrapper.find(instance).props().value;
};

describe("<Form />", () => {
  it("receive promotions default is true", () => {
    const wrapper = shallow(<Form />);
    const optIn = wrapper.find('[data-testid="optIn"]');
    expect(optIn.props().checked).toBe(true);
  });
  it("submits the form", () => {
    jest
      .spyOn(api, "addUser")
      .mockImplementation(() => Promise.resolve({ data: "New user added" }));
    const wrapper = shallow(<Form />);
    expect(updateInput(wrapper, '[data-testid="name"]', "Carlton")).toBe(
      "Carlton"
    );
    expect(updateInput(wrapper, '[data-testid="email"]', "cj@me.com")).toBe(
      "cj@me.com"
    );
    expect(updateInput(wrapper, '[data-testid="phone"]', "1234")).toBe("1234");
    wrapper
      .find('[data-testid="optIn"]')
      .simulate("change", { target: { checked: false } });
    expect(wrapper.find('[data-testid="optIn"]').props().checked).toBe(false);
    wrapper
      .find('[data-testid="addUserForm"]')
      .simulate("submit", { preventDefault: () => "hi" });
    expect(api.addUser).toHaveBeenCalledWith({
      name: "Carlton",
      email: "cj@me.com",
      phone: "1234",
      optIn: false
    });
  });
  it("matches snapshot", () => {
    const wrapper = shallow(<Form />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
