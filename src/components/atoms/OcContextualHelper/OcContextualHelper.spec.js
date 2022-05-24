import OcContextualHelper from "./OcContextualHelper.vue"
import { createLocalVue, shallowMount } from "@vue/test-utils"
import GetTextPlugin from "vue-gettext"

const localVue = createLocalVue()
localVue.use(GetTextPlugin, {
  translations: "does-not-matter.json",
  silent: true,
})

describe("OcContextualHelper", () => {
  function getWrapperWithProps(props) {
    return shallowMount(OcContextualHelper, {
      localVue: localVue,
      propsData: props,
      stubs: {
        OcDrop: true,
      },
    })
  }
  describe("should use props correctly", () => {
    it("should set text prop", () => {
      const wrapper = getWrapperWithProps({ text: "test-my-text" })
      expect(wrapper.find(".info-text").text()).toBe("test-my-text")
    })
    it("should set list prop", () => {
      const listValues = ["a-list-value", "b-list-value", "c-list-value"]
      const wrapper = getWrapperWithProps({ list: listValues })
      const result = wrapper.find(".info-list").text()
      listValues.forEach(value => {
        expect(result).toContain(value)
      })
    })
    it("should set a readMore link", () => {
      const wrapper = getWrapperWithProps({ readMoreLink: "owncloud.design" })
      const attributes = wrapper.find(".info-more-link").attributes()
      expect(attributes["href"]).toBe("owncloud.design")
      expect(attributes["target"]).toBe("_blank")
    })
    it("should set end-text prop", () => {
      const wrapper = getWrapperWithProps({ endText: "test-my-text" })
      expect(wrapper.find(".info-text-end").text()).toBe("test-my-text")
    })
  })
})
