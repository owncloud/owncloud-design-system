import { shallowMount } from "@vue/test-utils"

import Name from "./OcResourceName.vue"

const fullPath = "images/nature/forest.jpg"

describe("OcResourceName", () => {
  it("displays full path", () => {
    const wrapper = shallowMount(Name, {
      propsData: {
        fullPath,
        isPathDisplayed: true,
      },
    })

    expect(wrapper.find(".oc-resource-path").text()).toMatch("…/nature/")
    expect(wrapper.find(".oc-resource-basename").text()).toMatch("forest")
    expect(wrapper.find(".oc-resource-extension").text()).toMatch(".jpg")
    expect(wrapper.find(".oc-resource-name").attributes(["uk-tooltip"])).toMatch(
      "images/nature/forest.jpg"
    )
    expect(wrapper).toMatchSnapshot()
  })

  it("displays only direct parent", () => {
    const wrapper = shallowMount(Name, {
      propsData: {
        fullPath: "Documents/notes.txt",
        isPathDisplayed: true,
      },
    })

    expect(wrapper.find(".oc-resource-path").text()).toMatch("Documents/")
    expect(wrapper.find(".oc-resource-basename").text()).toMatch("notes")
    expect(wrapper.find(".oc-resource-extension").text()).toMatch(".txt")
    expect(wrapper).toMatchSnapshot()
  })

  it("hides the path if not enabled", () => {
    const wrapper = shallowMount(Name, {
      propsData: {
        fullPath,
      },
    })

    expect(wrapper.findAll(".oc-resource-path").length).toBe(0)
    expect(wrapper.find(".oc-resource-basename").text()).toMatch("forest")
    expect(wrapper.find(".oc-resource-extension").text()).toMatch(".jpg")
    expect(wrapper).toMatchSnapshot()
  })

  it("doesn't add extension to hidden folder", () => {
    const wrapper = shallowMount(Name, {
      propsData: {
        fullPath: ".hidden",
      },
    })

    expect(wrapper.find(".oc-resource-basename").text()).toMatch(".hidden")
    expect(wrapper.findAll(".oc-resource-extension").length).toBe(0)
    expect(wrapper).toMatchSnapshot()
  })
})
