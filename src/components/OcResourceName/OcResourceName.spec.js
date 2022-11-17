import { shallowMount } from "@vue/test-utils"

import Name from "./OcResourceName.vue"

const fullPath = "images/nature/forest.jpg"
const name = "forest.jpg"
const extension = "jpg"
const type = "file"

describe("OcResourceName", () => {
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
    expect(node.attributes("data-test-resource-type")).toMatch(type)
    expect(node.attributes("data-test-resource-name")).toMatch(name)
    expect(node.attributes("data-test-resource-path")).toMatch("/" + name)
  })

  it("truncates very long name per default", () => {
    const wrapper = shallowMount(Name, {
      propsData: {
        fullPath:
          "super-long-file-name-which-will-be-truncated-when-exceeding-the-screen-space-while-still-preserving-the-file-extension-at-the-end.txt",
        name: ".super-long-file-name-which-will-be-truncated-when-exceeding-the-screen-space-while-still-preserving-the-file-extension-at-the-end.txt",
        extension: "txt",
        type: "file",
      },
    })

    expect(wrapper).toMatchSnapshot()
  })

  it("does not truncate a very long name when disabled", () => {
    const wrapper = shallowMount(Name, {
      propsData: {
        fullPath:
          "super-long-file-name-which-will-be-truncated-when-exceeding-the-screen-space-while-still-preserving-the-file-extension-at-the-end.txt",
        name: ".super-long-file-name-which-will-be-truncated-when-exceeding-the-screen-space-while-still-preserving-the-file-extension-at-the-end.txt",
        extension: "txt",
        type: "file",
        truncateName: false,
      },
    })

    expect(wrapper).toMatchSnapshot()
  })

  it("shows the name as HTML title if the path is not displayed", () => {
    const wrapper = shallowMount(Name, {
      propsData: {
        fullPath: "folder",
        name: "folder",
        extension: "",
        type: "folder",
        isPathDisplayed: false,
      },
    })

    expect(wrapper).toMatchSnapshot()
  })

  it("does not show the name as HTML title if the path is being displayed", () => {
    const wrapper = shallowMount(Name, {
      propsData: {
        fullPath: "folder",
        name: "folder",
        extension: "",
        type: "folder",
        isPathDisplayed: true,
      },
    })

    expect(wrapper).toMatchSnapshot()
  })
})
