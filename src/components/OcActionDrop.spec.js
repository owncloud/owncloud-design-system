import OcActionDrop from "./OcActionDrop.vue"
import { mount } from "@vue/test-utils"

describe("OcActionDrop", () => {
  describe("toggle dropdown", () => {
    let wrapper
    beforeEach(async () => {
      wrapper = await mount(OcActionDrop, {
        slots: {
          actions:
            "<p class='slot-action'>First action</p>" + "<p class='slot-action'>Second action</p>",
        },
      })
    })
    it("should set dropdown menu as hidden at first", () => {
      expect(wrapper.find(".oc-dropdown-menu").exists()).toBeTruthy()
      expect(wrapper.find(".oc-dropdown-wrapper button").attributes("aria-expanded")).toBe("false")
      expect(wrapper.find(".oc-dropdown-menu").attributes("hidden")).toBe("hidden")
    })
    describe("when toggle button is toggled", () => {
      it("should toggle visibility of dropdown menu", async () => {
        await wrapper.find(".oc-dropdown-wrapper button").trigger("click")
        expect(wrapper.find(".oc-dropdown-menu").attributes("hidden")).toBe(undefined)
        expect(wrapper.find(".oc-dropdown-wrapper button").attributes("aria-expanded")).toBe("true")
        await wrapper.find(".oc-dropdown-wrapper button").trigger("click")
        expect(wrapper.find(".oc-dropdown-menu").attributes("hidden")).toBe("hidden")
        expect(wrapper.find(".oc-dropdown-wrapper button").attributes("aria-expanded")).toBe(
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
        await wrapper.find(".oc-dropdown-menu").trigger("click")
        expect(wrapper.find(".oc-dropdown-menu").attributes("hidden")).toBe("hidden")
      })
    })
  })
  describe("open menu and focus", () => {
    let wrapper
    beforeEach(async () => {
      wrapper = await mount(OcActionDrop, {
        slots: {
          actions:
            "<p class='slot-action'>First action</p>" + "<p class='slot-action'>Second action</p>",
        },
      })
    })
    it.each(["keydown.enter", "keydown.space", "keydown.down"])(
      "should open the dropdown menu on different keyboard events",
      async event => {
        await wrapper.find(".oc-dropdown-wrapper button").trigger(event)
        expect(wrapper.find(".oc-dropdown-menu").attributes("hidden")).toBe(undefined)
      }
    )
  })
})
