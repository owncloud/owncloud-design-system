import { shallowMount, mount } from "@vue/test-utils"
import Alert from "./OCAlert.vue"

const testSlots = { default: '<p class="slot-message">Test message</p>' }

describe("OCAlert", () => {
  it("displays correct message", () => {
    const wrapper = shallowMount(Alert, {
      slots: testSlots
    })

    expect(wrapper.find(".slot-message").text()).toMatch("Test message")
    expect(wrapper).toMatchSnapshot()
  })

  it("hides the close button if disabled", () => {
    const wrapper = shallowMount(Alert, {
      propsData: {
        noClose: true
      },
      slots: testSlots
    })
    
    expect(wrapper.props().noClose).toBe(true)
    expect(wrapper.findAll(".uk-alert-close").length).toBe(0)
    expect(wrapper).toMatchSnapshot()
  })

  it("sets correct variation", () => {
    const wrapper = shallowMount(Alert, {
      propsData: {
        variation: "primary"
      },
      slots: testSlots
    })

    expect(wrapper.props().variation).toMatch("primary")
    expect(wrapper.classes()).toContain("oc-alert-primary")
    expect(wrapper).toMatchSnapshot()
  })

  it("emits a close event", () => {
    const wrapper = mount(Alert, {
      slots: testSlots
    })

    wrapper.find(".uk-alert-close").trigger("click")
    expect(wrapper.emitted().close).toBeTruthy()
  })
})
