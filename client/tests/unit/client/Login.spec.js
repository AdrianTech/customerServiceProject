import Login from "../../../src/components/Login.vue";
import Vuex from "vuex";
import store from "../../../src/store/index";
const localVue = createLocalVue();
localVue.use(Vuex);

import { mount, createLocalVue, shallowMount } from "@vue/test-utils";

describe("Login component test", () => {
  let actions;
  beforeEach(() => {
    actions = {
      loginUser: jest.fn(),
      errHandler: jest.fn()
    };
  });
  const wrapper = mount(Login, {
    localVue,
    store
  });
  test("is a Vue instance", () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
    expect(wrapper.contains(".form")).toBe(true);
    expect(wrapper.contains("label")).toBe(true);
  });
  test("test form", () => {
    wrapper.find("form").trigger("submit");
    expect(wrapper.vm.email).toBe("");
    expect(wrapper.vm.password).toBe("");
  });
  //   test("button trigger", () => {
  //     const wrapper = shallowMount(ServicesList, {
  //       store,
  //       localVue
  //     });
  //     wrapper.find("button").trigger("click");
  //     expect(wrapper.vm.state).toBe(true);
  //     wrapper.find("button").trigger("click");
  //     expect(wrapper.vm.state).toBe(false);
  //     const div = wrapper.find(".servicesList");
  //     expect(div.is("div")).toBe(true);
  //   });
});
