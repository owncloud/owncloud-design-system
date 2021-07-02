import OcNavbar from "./OcNavbar.vue"

const { mount } = require("@vue/test-utils")

describe("OcNavbar", () => {
  function getWrapper(props = {}) {
    return mount(OcNavbar, {
      propsData: {
        ...props,
      },
    })
  }
  const selectors = {
    navContainer: ".uk-navbar-container",
  }
  describe("sticky", () => {
    describe("when sticky if enabled", () => {
      const wrapper = getWrapper({ sticky: true, offset: 500 })
      it("should set uk-sticky on navbar if sticky is enabled", () => {
        expect(wrapper.attributes("uk-sticky")).toBeTruthy()
      })
      it("should set provided offset value on wrapper", () => {
        expect(wrapper.attributes("uk-sticky")).toBe("offset: 500")
      })
    })
    describe("when sticky is not enabled (default)", () => {
      it("should not set uk-sticky on wrapper", () => {
        const wrapper = getWrapper()
        expect(wrapper.attributes("uk-sticky")).toBe(undefined)
      })
    })
  })
  describe("when tag is provided", () => {
    it.each(["p", "div", "section"])("should set provided HTML tag to the wrapper", tag => {
      const wrapper = getWrapper({ tag: tag })
      const actualTagName = wrapper.find(selectors.navContainer).element.tagName
      expect(actualTagName).toBe(tag.toUpperCase())
      expect(wrapper.find(actualTagName)).toBeTruthy()
    })
  })
  describe("slot", () => {
    it("should render provided slot html", () => {
      const wrapper = mount(OcNavbar, {
        slots: {
          default: '<p class="test class">Test content</p>',
        },
      })
      const navContainer = wrapper.find(selectors.navContainer)
      const slotEl = navContainer.find("p")
      expect(slotEl.exists()).toBeTruthy()
      expect(slotEl.attributes().class).toBe("test class")
      expect(slotEl.text()).toBe("Test content")
    })
  })
})
