import OcAutocomplete from "./OcAutocomplete.vue"
import { mount } from "@vue/test-utils"

describe("OcAutocomplete", () => {
  function getWrapperWithProps(props = {}) {
    return mount(OcAutocomplete, {
      propsData: {
        ...props,
        label: "Test Label",
      },
    })
  }
  const selectors = {
    autocomplete: ".oc-autocomplete",
    message: ".oc-autocomplete-message",
    dropdown: ".oc-autocomplete-dropdown",
  }
  describe("when prop 'inputId' value is provided", () => {
    it("should set id of input", () => {
      const wrapper = getWrapperWithProps({ inputId: "test-id" })
      const inputElement = wrapper.find(`${selectors.autocomplete} input`)
      expect(inputElement.exists()).toBeTruthy()
      expect(inputElement.attributes("id")).toBe("test-id")
    })
  })
  describe("label", () => {
    it("should be target for the autocomplete input", () => {
      const wrapper = getWrapperWithProps({ inputId: "test-id" })
      const labelElement = wrapper.find(`${selectors.autocomplete} label`)
      expect(labelElement.exists()).toBeTruthy()
      expect(labelElement.attributes("for")).toBe("test-id")
      expect(labelElement.text()).toBe("Test Label")
    })
  })
  describe("message", () => {
    describe("when all message props are null", () => {
      const wrapper = getWrapperWithProps()
      it("should not render error message", () => {
        const messageElement = wrapper.find(selectors.message)
        expect(messageElement.exists()).toBeFalsy()
      })
      it("input should not have danger and warning class", () => {
        const inputElement = wrapper.find(`${selectors.autocomplete} input`)
        expect(inputElement.attributes("class")).not.toContain("oc-autocomplete-danger")
        expect(inputElement.attributes("class")).not.toContain("oc-autocomplete-warning")
      })
    })
    describe("description message", () => {
      it("should render message if prop 'descriptionMessage' is set", () => {
        const wrapper = getWrapperWithProps({ descriptionMessage: "Help Text" })
        const descriptionMessageElement = wrapper.find(selectors.message)
        expect(descriptionMessageElement.exists()).toBeTruthy()
        expect(descriptionMessageElement.isVisible()).toBeTruthy()
        expect(descriptionMessageElement.text()).toBe("Help Text")
      })
    })
    describe("warning message & error message", () => {
      describe.each`
        prop                | expectedClass
        ${"errorMessage"}   | ${"oc-autocomplete-danger"}
        ${"warningMessage"} | ${"oc-autocomplete-warning"}
      `("when prop '$prop' value is not null", ({ prop, expectedClass }) => {
        let propsData = {}
        propsData[prop] = "test message"
        const wrapper = getWrapperWithProps(propsData)
        it(`should display the provided prop ${prop} value as message`, () => {
          const warningMessageElement = wrapper.find(selectors.message)
          expect(warningMessageElement.exists()).toBeTruthy()
          expect(warningMessageElement.isVisible()).toBeTruthy()
          expect(warningMessageElement.text()).toBe("test message")
          expect(warningMessageElement.get("span").attributes("class")).toContain(expectedClass)
        })
        it("input should have respective class", () => {
          const inputElement = wrapper.find(`${selectors.autocomplete} input`)
          expect(inputElement.attributes("class")).toContain(expectedClass)
        })
      })
    })
  })
})
