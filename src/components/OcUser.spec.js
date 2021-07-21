import OcUser from "./OcUser.vue"
import { shallowMount } from "@vue/test-utils"

describe("OcUser", () => {
  describe("avatar prop", () => {
    it("should set provided avatar to oc avatar src", () => {
      const wrapper = getWrapper()
      const avatarElement = wrapper.find("oc-avatar-stub")

      expect(avatarElement.exists()).toBeTruthy()
      expect(avatarElement.attributes().src).toBe("test-av")
      expect(avatarElement.attributes().title).toBe(undefined)
    })

    it("should set provided username as avatar title", () => {
      const wrapper = getWrapper({ userName: "alice" })
      const avatarElement = wrapper.find("oc-avatar-stub")

      expect(avatarElement.attributes().title).toBe("alice")
    })
  })

  it("should set provided displayname as oc lead text", () => {
    const wrapper = getWrapper({ displayName: "Alice Hansen" })
    const displayNameElement = wrapper.find(".oc-text-lead")

    expect(displayNameElement.exists()).toBeTruthy()
    expect(displayNameElement.text()).toBe("Alice Hansen")
  })

  it("should set provided email as oc muted text", () => {
    const wrapper = getWrapper({ email: "alice@hansen.cc" })
    const emailElement = wrapper.find(".oc-text-muted")

    expect(emailElement.exists()).toBeTruthy()
    expect(emailElement.text()).toBe("alice@hansen.cc")
  })

  function getWrapper(props = {}) {
    return shallowMount(OcUser, {
      propsData: {
        avatar: "test-av",
        ...props,
      },
    })
  }
})
