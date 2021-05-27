import { shallowMount, mount } from "@vue/test-utils"
import OcTextInput from "./OcTextInput.vue"

const defaultProps = {
  label: "label"
}

describe("OcTextInput", () => {
  describe("clear input", () => {
    it('has no clear button when it is disabled', () => {
      const wrapper = shallowMount(OcTextInput, {
        propsData: {
          ...defaultProps,
          value: "non-empty-value"
        }
      })

      expect(wrapper.find(".oc-text-input-btn-clear").exists()).toBeFalsy()
    })

    it('has no clear button when it is enabled but the input is empty', () => {
      const wrapper = shallowMount(OcTextInput, {
        propsData: {
          ...defaultProps,
          clearButtonEnabled: true,
          value: ""
        }
      })

      expect(wrapper.find(".oc-text-input-btn-clear").exists()).toBeFalsy()
    })

    it('has a clear button when it is enabled and the input contains content', () => {
      const wrapper = shallowMount(OcTextInput, {
        propsData: {
          ...defaultProps,
          clearButtonEnabled: true,
          value: "non-empty-value"
        }
      })

      const btn = wrapper.find(".oc-text-input-btn-clear")
      expect(btn.exists()).toBeTruthy()
    })

    it('clears the content on click', async () => {
      const wrapper = mount(OcTextInput, {
        propsData: {
          ...defaultProps,
          clearButtonEnabled: true,
          value: "non-empty-value"
        }
      })

      const btn = wrapper.find(".oc-text-input-btn-clear")
      btn.trigger('click')
      await wrapper.vm.$nextTick()
      expect(wrapper.emitted().input[0][0]).toEqual("")
    })
  })
})
