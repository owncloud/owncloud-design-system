import { shallowMount } from "@vue/test-utils"

import Name from "./OcResourceName.vue"

const fullPath = "images/nature/forest.jpg"
const name = "forest.jpg"
const extension = "jpg"
const type = "file"

describe("OcResourceName", () => {
  it("displays full path", () => {
    const wrapper = shallowMount(Name, {
      propsData: {
        fullPath,
        isPathDisplayed: true,
        name,
        extension,
        type,
      },
    })

    expect(wrapper.find(".oc-resource-path").text()).toMatch("…/nature/")
    expect(wrapper.find(".oc-resource-basename").text()).toMatch("forest")
    expect(wrapper.find(".oc-resource-extension").text()).toMatch(".jpg")
    expect(wrapper).toMatchSnapshot()
  })

  it("displays only direct parent", () => {
    const wrapper = shallowMount(Name, {
      propsData: {
        fullPath: "Documents/notes.txt",
        isPathDisplayed: true,
        name: "notes.txt",
        extension: "txt",
        type: "file",
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
        name,
        extension,
        type,
      },
    })

    expect(wrapper.find(".oc-resource-path").exists()).toBeFalsy()
    expect(wrapper.find(".oc-resource-basename").text()).toMatch("forest")
    expect(wrapper.find(".oc-resource-extension").text()).toMatch(".jpg")
    expect(wrapper).toMatchSnapshot()
  })

  it("doesn't add extension to hidden folder", () => {
    const wrapper = shallowMount(Name, {
      propsData: {
        fullPath: ".hidden",
        name: ".hidden",
        extension: "",
        type: "folder",
      },
    })

    expect(wrapper.find(".oc-resource-basename").text()).toMatch(".hidden")
    expect(wrapper.find(".oc-resource-extension").exists()).toBeFalsy()
    expect(wrapper).toMatchSnapshot()
  })

  it("renders folder names with dots completely in the basename", () => {
    const wrapper = shallowMount(Name, {
      propsData: {
        fullPath: "folder.with.dots",
        name: "folder.with.dots",
        extension: "",
        type: "folder",
      },
    })

    expect(wrapper.find(".oc-resource-basename").text()).toMatch("folder.with.dots")
    expect(wrapper.find(".oc-resource-extension").exists()).toBeFalsy()
    expect(wrapper).toMatchSnapshot()
  })

  it("has properties for resource path, name and type", () => {
    const wrapper = shallowMount(Name, {
      propsData: {
        fullPath,
        name,
        extension,
        type,
      },
    })

    const node = wrapper.find(".oc-resource-name")
    expect(node.attributes("resource-type")).toMatch(type)
    expect(node.attributes("resource-name")).toMatch(name)
    expect(node.attributes("resource-path")).toMatch("/" + name)
  })
})
