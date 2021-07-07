import OcNavItem from "./OcNavItem.vue"
import { shallowMount } from "@vue/test-utils"

describe("OcNavItem", () => {
  function getWrapper(props = {}) {
    return shallowMount(OcNavItem, {
      propsData: props,
    })
  }
  describe("icon prop", () => {
    it("should render icon if icon is provided", () => {
      const wrapper = getWrapper({ icon: "mdi-test" })
      expect(wrapper.find("oc-icon-stub").exists()).toBeTruthy()
      expect(wrapper.find("oc-icon-stub").attributes("name")).toBe("mdi-test")
    })
    it("should not render icon if icon is not provided", () => {
      const wrapper = getWrapper({})
      expect(wrapper.find("oc-icon-stub").exists()).toBeFalsy()
    })
  })
  describe("active prop", () => {
    it("should li item as active if active prop is true", () => {
      const wrapper = getWrapper({ active: true })
      expect(wrapper.attributes("class")).toContain("uk-active")
    })
    it("should not  set li item as active if active prop is false", () => {
      // active prop is false by default
      const wrapper = getWrapper()
      expect(wrapper.attributes("class")).not.toContain("uk-active")
    })
  })
  describe("when link inside li item is clicked", () => {
    it("should emit click event", async () => {
      const wrapper = getWrapper()
      const linkElement = wrapper.find("a")
      expect(linkElement.exists()).toBeTruthy()
      expect(wrapper.emitted("click")).toBeFalsy()
      await linkElement.trigger("click")
      expect(wrapper.emitted("click")).toBeTruthy()
    })
  })
})
