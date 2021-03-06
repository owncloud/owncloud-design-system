import { shallowMount } from "@vue/test-utils"

import Size from "./OcResourceSize.vue"

describe("OcResourceSize", () => {
  it("shows a question mark for non-numeric values", () => {
    const wrapper = shallowMount(Size, {
      propsData: {
        size: "asdf",
      },
    })

    expect(wrapper.find(".oc-resource-size").text()).toEqual("?")
  })

  it("shows '--' for values smaller than 0", () => {
    const wrapper = shallowMount(Size, {
      propsData: {
        size: -42,
      },
    })

    expect(wrapper.find(".oc-resource-size").text()).toEqual("--")
  })

  it("shows reasonable decimal places", async () => {
    const wrapper = shallowMount(Size, {
      propsData: {
        size: 24064,
      },
    })
    expect(wrapper.find(".oc-resource-size").text()).toEqual("24 KB")

    wrapper.setProps({
      size: 44145049,
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.find(".oc-resource-size").text()).toEqual("42.1 MB")
  })

  it("converts strings to numbers", () => {
    const wrapper = shallowMount(Size, {
      propsData: {
        size: "24064",
      },
    })
    expect(wrapper.find(".oc-resource-size").text()).toEqual("24 KB")
  })

  describe("language is not defined", () => {
    it("returns size if language is undefined", () => {
      const localThis = { $language: undefined, size: 100 }

      expect(Size.computed.formattedSize.call(localThis)).toBe("100 B")
    })

    it("returns size if current language is missing", () => {
      const localThis = { $language: {}, size: 100 }

      expect(Size.computed.formattedSize.call(localThis)).toBe("100 B")
    })
  })
})
