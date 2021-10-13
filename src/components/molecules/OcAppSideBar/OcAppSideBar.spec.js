import { mount } from "@vue/test-utils"
import OcAppSideBar from "./OcAppSideBar.vue"

describe("OcAppSideBar", () => {
  const selectors = {
    sideBar: ".oc-app-side-bar",
    title: ".sidebar-title",
    content: ".content",
    footer: ".footer",
    action: ".action",
  }
  function getWrapper(props = {}, slots = {}) {
    return mount(OcAppSideBar, {
      propsData: {
        ...props,
      },
      slots: {
        ...slots,
      },
    })
  }
  describe("sidebar title", () => {
    it("should set the provided heading text from prop", () => {
      const wrapper = getWrapper({
        headingText: "Test Heading",
      })
      expect(wrapper.find(selectors.title).exists()).toBeTruthy()
      expect(wrapper.find(`${selectors.title} span`).text()).toBe("Test Heading")
    })
  })
  describe("sidebar slots", () => {
    it.each`
      slot
      ${"title"}
      ${"content"}
      ${"footer"}
      ${"action"}
    `("should content html from content slot $slot", ({ slot }) => {
      const slotData = {}
      slotData[slot] = "<p class='test-class'>Lorem ipsum</p>"
      const wrapper = getWrapper({}, slotData)
      const sideBarTitleElement = wrapper.find(selectors[slot])
      expect(sideBarTitleElement.exists()).toBeTruthy()
      expect(wrapper.find("p").attributes("class")).toBe("test-class")
      expect(wrapper.find("p").text()).toBe("Lorem ipsum")
    })
  })
  describe("default action", () => {
    it("should set the provided close button label", () => {
      const wrapper = getWrapper({
        closeButtonLabel: "Terminate",
      })
      const actionElement = wrapper.find(selectors.action)
      expect(actionElement.exists()).toBeTruthy()
      expect(actionElement.find("button").exists()).toBeTruthy()
      expect(actionElement.find("button").attributes("aria-label")).toBe("Terminate")
    })
    it("should emit close when action button is clicked", () => {
      const wrapper = getWrapper()
      const actionElement = wrapper.find(selectors.action)
      actionElement.find("button").trigger("click")
      expect(wrapper.emitted("close")).toBeTruthy()
    })
  })
})
