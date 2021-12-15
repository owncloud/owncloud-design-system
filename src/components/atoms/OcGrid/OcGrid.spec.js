import OcGrid from "./OcGrid.vue"
import { mount } from "@vue/test-utils"

describe("OcGrid", () => {
  function getWrapper(props = {}) {
    return mount(OcGrid, {
      propsData: props,
    })
  }
  describe("gutter", () => {
    it.each(["small", "medium", "large", "collapse"])(
      "should set provided gutter value",
      gutter => {
        const wrapper = getWrapper({
          gutter: gutter,
        })
        expect(wrapper.attributes("class")).toBe("uk-grid-" + gutter)
      }
    )
    it("should not accept invalid values", () => {
      expect(() => {
        getWrapper({
          gutter: "invalid",
        })
      }).toThrow(`[Vue warn]: Invalid prop: custom validator check failed for prop "gutter".`)
    })
  })
  describe("when match prop is true", () => {
    it("should set gird match class", () => {
      const wrapper = getWrapper({ match: true })
      expect(wrapper.attributes("class")).toContain("uk-grid-match")
    })
  })
  describe("when flex prop is true", () => {
    it("should set grid flex class", () => {
      const wrapper = getWrapper({ flex: true })
      expect(wrapper.attributes("class")).toContain("uk-flex")
      expect(wrapper.attributes("class")).toContain("uk-flex-middle")
    })
  })
  describe("child width", () => {
    describe("when child width is string", () => {
      it("should set child width class to the grid wrapper", () => {
        const wrapper = getWrapper({ childWidth: "1-2" })
        expect(wrapper.attributes("class")).toContain("uk-child-width-1-2")
      })
    })
    describe("when child width is an array", () => {
      it("should every element in array as child width class", () => {
        const wrapper = getWrapper({
          childWidth: ["1-2", "1-3"],
        })
        expect(wrapper.attributes("class")).toContain("uk-child-width-1-2")
        expect(wrapper.attributes("class")).toContain("uk-child-width-1-3")
      })
    })
  })
})
