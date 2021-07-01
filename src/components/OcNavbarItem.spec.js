import _OcNavbarItem from "./_OcNavbarItem.vue"
import { mount } from "@vue/test-utils"

describe("OcNavbarItem", () => {
  function getWrapper(props) {
    return mount(_OcNavbarItem, {
      propsData: {
        ...props,
      },
    })
  }
  it("should set class according to provided position", () => {
    const wrapper = getWrapper({ position: "test" })
    expect(wrapper.attributes("class")).toBe("uk-navbar-test")
  })
})
