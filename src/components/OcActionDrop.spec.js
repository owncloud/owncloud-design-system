import OcActionDrop from "./OcActionDrop.vue"
import { mount } from "@vue/test-utils"

describe("OcActionDrop", () => {
  const selectors = {
    dropdownMenu: ".oc-dropdown-menu",
    dropdownWrapperButton: ".oc-dropdown-wrapper button",
  }
  const defaultActionSlot = {
    actions: "<p class='slot-action'>First action</p>" + "<p class='slot-action'>Second action</p>",
  }
  function getWrapperWithActionSlot() {
    return mount(OcActionDrop, { slots: defaultActionSlot })
  }
  describe("toggle dropdown", () => {
    let wrapper
    beforeEach(async () => {
      wrapper = await getWrapperWithActionSlot()
    })
    it("should set dropdown menu as hidden at first", () => {
      expect(wrapper.find(selectors.dropdownMenu).exists()).toBeTruthy()
      expect(wrapper.find(selectors.dropdownWrapperButton).attributes("aria-expanded")).toBe(
        "false"
      )
      expect(wrapper.find(selectors.dropdownMenu).attributes("hidden")).toBe("hidden")
    })
    describe("when toggle button is toggled", () => {
      it("should toggle visibility of dropdown menu", async () => {
        await wrapper.find(selectors.dropdownWrapperButton).trigger("click")
        expect(wrapper.find(selectors.dropdownMenu).attributes("hidden")).toBe(undefined)
        expect(wrapper.find(selectors.dropdownWrapperButton).attributes("aria-expanded")).toBe(
          "true"
        )
        await wrapper.find(selectors.dropdownWrapperButton).trigger("click")
        expect(wrapper.find(selectors.dropdownMenu).attributes("hidden")).toBe("hidden")
        expect(wrapper.find(selectors.dropdownWrapperButton).attributes("aria-expanded")).toBe(
          "false"
        )
      })
    })
    describe("when dropdown is open and menu is clicked", () => {
      let wrapper
      beforeEach(async () => {
        wrapper = await mount(OcActionDrop, {
          data() {
            return {
              isOpen: true,
            }
          },
        })
        wrapper.vm.$refs.button.focus = jest.fn()
      })
      it("should close the dropdown menu", async () => {
        expect(wrapper.find(selectors.dropdownMenu).attributes("hidden")).toBe(undefined)
        await wrapper.find(selectors.dropdownMenu).trigger("click")
        expect(wrapper.find(selectors.dropdownMenu).attributes("hidden")).toBe("hidden")
      })
    })
  })
  describe("open menu and focus", () => {
    let wrapper
    beforeEach(async () => {
      wrapper = await getWrapperWithActionSlot()
    })
    it.each(["keydown.enter", "keydown.space", "keydown.down"])(
      "should open the dropdown menu on different keyboard events",
      async event => {
        await wrapper.find(selectors.dropdownWrapperButton).trigger(event)
        expect(wrapper.find(selectors.dropdownMenu).attributes("hidden")).toBe(undefined)
      }
    )
  })
})
