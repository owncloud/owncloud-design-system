import OcCheckbox from "./OcCheckbox.vue"
import { mount } from "@vue/test-utils"

describe("OcCheckbox", () => {
  function getWrapperWithProps(props) {
    return mount(OcCheckbox, {
      propsData: {
        label: "test label",
        ...props,
      },
    })
  }
  const checkboxSelector = "input[type='checkbox']"

  describe("input id", () => {
    it("should set the provided id for the input", () => {
      const wrapper = getWrapperWithProps({ id: "test-id" })
      const checkBoxElement = wrapper.find(checkboxSelector)
      expect(checkBoxElement.exists()).toBeTruthy()
      expect(checkBoxElement.attributes("id")).toBe("test-id")
    })
  })
  describe("input label", () => {
    it("should set the provided label for the input", () => {
      const wrapper = getWrapperWithProps({ id: "test-id" })
      const checkBoxLabelElement = wrapper.find("label")
      expect(checkBoxLabelElement.exists()).toBeTruthy()
      expect(checkBoxLabelElement.attributes("for")).toBe("test-id")
      expect(checkBoxLabelElement.text()).toBe("test label")
    })
    it("should hide label if 'hideLabel' prop is enabled", () => {
      const wrapper = getWrapperWithProps({ hideLabel: true })
      const checkBoxLabelElement = wrapper.find("label")
      expect(checkBoxLabelElement.exists()).toBeTruthy()
      expect(checkBoxLabelElement.attributes("class")).toContain("oc-invisible-sr")
    })
    it("should have cursor pointer property if not disabled", () => {
      const wrapper = getWrapperWithProps({ disabled: false })
      const checkBoxLabelElement = wrapper.find("label")
      expect(checkBoxLabelElement.exists()).toBeTruthy()
      expect(checkBoxLabelElement.attributes("class")).toContain("oc-cursor-pointer")
    })
  })
  describe("input size", () => {
    it.each([
      { size: "small", class: "oc-checkbox-s" },
      { size: "medium", class: "oc-checkbox-m" },
      { size: "large", class: "oc-checkbox-l" },
    ])("valid size options", item => {
      const wrapper = getWrapperWithProps({ size: item.size })
      const checkboxElement = wrapper.find(checkboxSelector)
      expect(checkboxElement.exists()).toBeTruthy()
      expect(checkboxElement.attributes("class")).toContain(item.class)
    })
  })
})
