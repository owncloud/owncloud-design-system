import { shallowMount } from "@vue/test-utils"
import CompressionPlugin from "compression-webpack-plugin"
import Sidebar from "./OcSidebarNav.vue"

const defaultProps = {
  accessibleLabel: "sidebar"
}
const slots = {
  header: '<span class="header">Logo</span>',
  nav: '<span class="nav">Nav</span>',
  footer: '<span class="footer">Footer</span>'
}

describe("OcSidebarNav", () => {
  it('displays all slots', () => {
    const wrapper = shallowMount(Sidebar, {
      propsData: defaultProps,
      slots
    })

    expect(wrapper.findAll('.header').length).toBe(1)
    expect(wrapper.findAll('.nav').length).toBe(1)
    expect(wrapper.findAll('.footer').length).toBe(1)
  })

  it('sets accessible label', () => {
    const wrapper = shallowMount(Sidebar, {
      propsData: defaultProps,
      slots
    })

    expect(wrapper.find('nav').attributes()['aria-label']).toMatch('sidebar')
  })
})
