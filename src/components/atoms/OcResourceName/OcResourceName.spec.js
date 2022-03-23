import { shallowMount } from "@vue/test-utils"

import Name from "./OcResourceName.vue"
import OcButton from "../../atoms/OcButton/OcButton.vue"

const fullPath = "images/nature/forest.jpg"
const name = "forest.jpg"
const extension = "jpg"
const type = "file"

const stubs = {
  "oc-button": OcButton,
  "oc-icon": true,
}

describe("OcResourceName", () => {
  it("doesn't add extension to hidden folder", () => {
    const wrapper = shallowMount(Name, {
      propsData: {
        fullPath: ".hidden",
        name: ".hidden",
        extension: "",
        type: "folder",
      },
      stubs,
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
      stubs,
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
      stubs,
    })

    const node = wrapper.find(".oc-resource-name")
    expect(node.attributes("data-test-resource-type")).toMatch(type)
    expect(node.attributes("data-test-resource-name")).toMatch(name)
    expect(node.attributes("data-test-resource-path")).toMatch("/" + name)
  })
  it("click on quick rename should trigger rename event", async () => {
    const wrapper = shallowMount(Name, {
      propsData: {
        fullPath,
        name,
        extension,
        type,
      },
      stubs,
    })

    wrapper.find(".oc-resource-rename").trigger("click")
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted().rename).toBeTruthy()
  })
})
