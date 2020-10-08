import ServicesList from "../../src/components/services/ServicesList.vue";
import Vuex from "vuex";
import store from "../../src/store/index";
const localVue = createLocalVue();
localVue.use(Vuex);

import { mount, createLocalVue, shallowMount } from "@vue/test-utils";
// import Component from './component'

describe("Services list component tests", () => {
  let store;
  let getters;
  beforeEach(() => {
    getters = {
      services: jest.fn(),
    };

    store = new Vuex.Store({
      getters,
    });
  });
  const wrapper = mount(ServicesList);
  test("is a Vue instance", () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
  // test("snapshot", () => {
  //   expect(wrapper.element).toMatchSnapshot();
  // });
  test("button trigger", () => {
    const wrapper = shallowMount(ServicesList, {
      store,
      localVue,
    });
    // wrapper.find("button").trigger("click");
    expect(wrapper.vm.state).toBe(true);
    wrapper.find("button").trigger("click");
    expect(wrapper.vm.state).toBe(false);
    const div = wrapper.find(".servicesList");
    expect(div.is("div")).toBe(true);
  });
});
