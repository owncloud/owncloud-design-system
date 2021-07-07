import OcNotificationMessage from "./OcNotificationMessage.vue"
import { shallowMount } from "@vue/test-utils"

describe("OcNotificationMessage", () => {
  function getWrapper(props = {}) {
    return shallowMount(OcNotificationMessage, {
      propsData: {
        ...props,
        title: "Test passed",
      },
    })
  }
  describe("status prop", () => {
    it("should not allow values other than passive, primary, success, warning, danger", () => {
      try {
        getWrapper({
          status: "not-valid",
        })
        throw new Error(`Provided value for prop "status" is valid.`)
      } catch (e) {
        /* eslint-disable-next-line jest/no-conditional-expect, jest/no-try-expect */
        expect(e).toContain(
          '[Vue warn]: Invalid prop: custom validator check failed for prop "status".'
        )
      }
    })
    it.each(["passive", "primary", "success", "warning", "danger"])(
      "it should set provided status as class for wrapper",
      status => {
        const wrapper = getWrapper({ status: status })
        expect(wrapper.attributes("class")).toContain(status)
      }
    )
  })
})
