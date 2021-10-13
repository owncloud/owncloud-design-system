import { shallowMount } from "@vue/test-utils"

import Recipient from "./OcRecipient.vue"

describe("OcRecipient", () => {
  /**
   * @param {Object} props
   * @returns {Wrapper<Vue>}
   */
  function getWrapper(props, slot) {
    const slots = slot ? { append: slot } : {}

    return shallowMount(Recipient, {
      propsData: {
        recipient: {
          name: "alice",
          avatar: "avatar.jpg",
          hasAvatar: true,
          isLoadingAvatar: false,
          ...props,
        },
      },
      slots,
    })
  }

  it("displays recipient name", () => {
    const wrapper = getWrapper()

    expect(wrapper.find('[data-testid="recipient-name"]').text()).toEqual("alice")
  })

  it("displays avatar", () => {
    const wrapper = getWrapper()

    expect(wrapper.find('[data-testid="recipient-avatar"]').attributes("src")).toEqual("avatar.jpg")
  })

  it("displays a spinner if avatar has not been loaded yet", () => {
    const wrapper = getWrapper({
      isLoadingAvatar: true,
    })

    expect(wrapper.find('[data-testid="recipient-avatar-spinner"]').exists()).toBeTruthy()
  })

  it("displays an icon if avatar is not enabled", () => {
    const wrapper = getWrapper({
      icon: {
        name: "person",
        label: "User",
      },
      hasAvatar: false,
    })

    const icon = wrapper.find('[data-testid="recipient-icon"]')

    expect(icon.exists()).toBeTruthy()
    expect(icon.attributes().accessiblelabel).toEqual("User")
  })

  it("display content in the append slot", () => {
    const wrapper = getWrapper({}, '<span id="test-slot">Hello world</span>')

    expect(wrapper.find("#test-slot").exists()).toBeTruthy()
  })

  it.each([
    ["name is not defined", {}],
    [
      "name is not a string",
      {
        name: {
          first: "Alice",
        },
      },
    ],
    [
      "name is empty",
      {
        name: "",
      },
    ],
    ["icon name is not defined", { name: "Alice", icon: {} }],
    ["icon name is not a string", { name: "Alice", icon: { name: { inverted: "inverted" } } }],
    ["icon name is empty", { name: "Alice", icon: { name: "" } }],
    ["icon label is not defined", { name: "Alice", icon: { name: "person" } }],
    [
      "icon label is not a string",
      { name: "Alice", icon: { name: "person", label: { long: "Long label" } } },
    ],
    ["icon label is empty", { name: "Alice", icon: { name: "Alice", label: "" } }],
  ])("throws an error if %s", (def, prop) => {
    expect(() => shallowMount(Recipient, { propsData: { recipient: prop } })).toThrow(
      `Recipient ${def}`
    )
  })
})
