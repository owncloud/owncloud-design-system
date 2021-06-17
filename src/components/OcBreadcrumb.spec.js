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
  }),
    it("displays all items", () => {
      const wrapper = shallowMount(Breadcrumb, {
        propsData: {
          items,
        },
      })

      expect(wrapper.findAll(".oc-breadcrumb-list-item").length).toBe(4)
      expect(wrapper).toMatchSnapshot()
    })
})
