import { shallowMount } from "@vue/test-utils"
import Breadcrumb from "./OcBreadcrumb.vue"

const items = [
  { text: "First folder", to: { path: "folder" } },
  { text: "Subfolder", onClick: () => alert("Breadcrumb clicked!") },
  { text: "Deep", to: { path: "folder" } },
  { text: "Deeper ellipsize in responsive mode" },
]

describe("OcBreadcrumb", () => {
  it("sets correct variation", () => {
    const wrapper = shallowMount(Breadcrumb, {
      propsData: {
        variation: "lead",
        items,
      },
    })

    expect(wrapper.props().variation).toMatch("lead")
    expect(wrapper.classes()).toContain("oc-breadcrumb-lead")
    expect(wrapper).toMatchSnapshot()
  })
  it("displays all items", () => {
    const wrapper = shallowMount(Breadcrumb, {
      propsData: {
        items,
      },
    })

    expect(wrapper.findAll(".oc-breadcrumb-list-item").length).toBe(4)
    expect(wrapper.findAll("#oc-breadcrumb-contextmenu-trigger").length).toBe(0)
    expect(wrapper).toMatchSnapshot()
  })
  it("displays context menu trigger", () => {
    const wrapper = shallowMount(Breadcrumb, {
      propsData: {
        items,
      },
      slots: {
        contextMenu: "Example item",
      },
    })

    expect(wrapper.findAll("#oc-breadcrumb-contextmenu-trigger").length).toBe(1)
  })
  it("does not display context menu trigger when no slot given", () => {
    const wrapper = shallowMount(Breadcrumb, {
      propsData: {
        items,
      },
    })

    expect(wrapper.findAll("#oc-breadcrumb-contextmenu-trigger").length).toBe(0)
  })
  it("does not display context menu trigger with only one item", () => {
    const wrapper = shallowMount(Breadcrumb, {
      propsData: {
        items: [{ text: "First and only folder", to: { path: "folder" } }],
      },
      slots: {
        contextMenu: "Example item",
      },
    })

    expect(wrapper.findAll("#oc-breadcrumb-contextmenu-trigger").length).toBe(0)
  })
})
