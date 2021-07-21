import { shallowMount, mount } from "@vue/test-utils"
import OcTextarea from "./OcTextarea.vue"

const defaultProps = {
  label: "label",
}

describe("OcTextarea", () => {
  function getShallowWrapper(props = {}) {
    return shallowMount(OcTextarea, {
      propsData: {
      ...defaultProps,
      ...props,
      },
    })
  }
  function getMountedWrapper(options = {}) {
    return mount(OcTextarea, options)
  }
  const selectors = {
    textareaMessage: ".oc-textarea-message span",
    textArea: ".oc-textarea",
  }
  describe("id prop", () => {
    const wrapper = getShallowWrapper({ id: "test-textarea-id", descriptionMessage: "hello" })
    it("should set provided id to the textarea", () => {
      expect(wrapper.find("textarea").attributes().id).toBe("test-textarea-id")
    })
    it("should set label target for provided id", () => {
      expect(wrapper.find("label").attributes().for).toBe("test-textarea-id")
    })
    it("should set message id according to provided id", () => {
      expect(wrapper.find(selectors.textareaMessage).attributes().id).toBe("test-textarea-id-message")
    })
  })
  describe("label prop", () => {
    it("should set provided label to the textarea", () => {
      const wrapper = getShallowWrapper()
      expect(wrapper.find("label").text()).toBe("label")
    })
  })
  describe("when a description message is provided", () => {
    const wrapper = getShallowWrapper({ descriptionMessage: "You should pass." })
    it("should add the description class to the textarea message", () => {
      expect(wrapper.find(selectors.textareaMessage).attributes().class).toContain(
        "oc-textarea-description"
      )
    })
    it("should show the description message as the input message text", () => {
      expect(wrapper.find(selectors.textareaMessage).text()).toBe("You should pass.")
    })
  })
  describe("when a warning message is provided", () => {
    const wrapper = getShallowWrapper({ warningMessage: "You may pass." })
    it("should add the warning class to the textarea", () => {
      expect(wrapper.find("textarea").attributes().class).toContain("oc-textarea-warning")
    })
    it("should add the warning class to the textarea message", () => {
      expect(wrapper.find(selectors.textareaMessage).attributes().class).toContain(
        "oc-textarea-warning"
      )
    })
    it("should show the warning message as the textarea message text", () => {
      expect(wrapper.find(selectors.textareaMessage).text()).toBe("You may pass.")
    })
  })
});