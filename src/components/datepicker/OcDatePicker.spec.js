import { shallowMount } from "@vue/test-utils"

import DatePicker from "./OcDatePicker.vue"

const slotDefault = "<button id='default-slot'>Open datepicker</button>"

describe("OcDatePicker", () => {
  it("renders default scoped slot", () => {
    const wrapper = shallowMount(DatePicker, {
      slots: { default: slotDefault },
      propsData: { value: null },
    })

    expect(wrapper.find("#default-slot").exists()).toBeTruthy()
  })
})
