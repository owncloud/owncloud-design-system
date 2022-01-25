import { shallowMount } from "@vue/test-utils"
import Sidebar from "./OcSidebarNav.vue"

const defaultProps = {
  accessibleLabelHeader: "sidebar-header",
  accessibleLabelNav: "sidebar-nav",
  accessibleLabelFooter: "sidebar-footer",
}
const slots = {
  header: '<span class="header">Logo</span>',
  nav: '<span class="nav">Nav</span>',
  footer: '<span class="footer">Footer</span>',
}

describe("OcSidebarNav", () => {
  it("displays all slots", () => {
    const wrapper = shallowMount(Sidebar, {
      propsData: defaultProps,
      slots,
    })

    expect(wrapper.findAll(".header").length).toBe(1)
    expect(wrapper.findAll(".nav").length).toBe(1)
    expect(wrapper.findAll(".footer").length).toBe(1)
  })

  it("sets all accessible labels", () => {
    const wrapper = shallowMount(Sidebar, {
      propsData: defaultProps,
      slots,
    })

    expect(wrapper.find("figure").attributes()["aria-label"]).toMatch("sidebar-header")
    expect(wrapper.find("nav").attributes()["aria-label"]).toMatch("sidebar-nav")
    expect(wrapper.find("footer").attributes()["aria-label"]).toMatch("sidebar-footer")
  })
})
