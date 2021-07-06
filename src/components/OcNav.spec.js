import OcNav from "./OcNav.vue"
import { mount } from "@vue/test-utils"

describe("OcNav", () => {
  function getWrapper(options = {}) {
    return mount(OcNav, options)
  }
  it("should render slot html", () => {
    const wrapper = getWrapper({
      slots: {
        default: "<p class='test slot'>test slot content</p>",
      },
    })
    const slotElement = wrapper.find("p")
    expect(slotElement.attributes("class")).toBe("test slot")
    expect(slotElement.text()).toBe("test slot content")
  })
})
