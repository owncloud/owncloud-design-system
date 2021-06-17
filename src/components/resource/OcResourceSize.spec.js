import { shallowMount } from "@vue/test-utils"

import Size from "./OcResourceSize.vue"

describe("OcResourceSize", () => {
  it("shows a question mark for non-numeric values", () => {
    const wrapper = shallowMount(Size, {
      propsData: {
        size: "asdf",
      },
    })

    expect(wrapper.find(".oc-resource-size").text()).toMatch("?")
  })

  it("shows an empty string for values smaller than 0", () => {
    const wrapper = shallowMount(Size, {
      propsData: {
        size: -42,
      },
    })

    expect(wrapper.find(".oc-resource-size").text()).toMatch("")
  })

  it("shows reasonable decimal places", async () => {
    const wrapper = shallowMount(Size, {
      propsData: {
        size: 24064,
      },
    })
    expect(wrapper.find(".oc-resource-size").text()).toMatch("24 KB")

    wrapper.setProps({
      size: 44145049,
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.find(".oc-resource-size").text()).toMatch("42.1 MB")
  })

  it("converts strings to numbers", () => {
    const wrapper = shallowMount(Size, {
      propsData: {
        size: "24064",
      },
    })
    expect(wrapper.find(".oc-resource-size").text()).toMatch("24 KB")
  })
})
