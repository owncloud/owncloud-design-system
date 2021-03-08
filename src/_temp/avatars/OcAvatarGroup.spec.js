import { shallowMount } from "@vue/test-utils"

import Group from "./OcAvatarGroup.vue"

const users = [
  {
    id: "bob",
    username: "bob",
    displayName: "Bob",
    avatar:
      "https://images.unsplash.com/photo-1610216705422-caa3fcb6d158?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHwyfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "marie",
    username: "marie",
    displayName: "Marie",
    avatar:
      "https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mzh8fGZhY2V8ZW58MHwyfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "john",
    username: "john",
    displayName: "John Richards Emperor of long names",
  },
]

describe("OcAvatarGroup", () => {
  it("displays tooltip", async () => {
    const wrapper = shallowMount(Group, {
      propsData: {
        users,
        maxDisplayed: 2,
        isTooltipDisplayed: true,
      },
    })

    expect(wrapper.attributes()["uk-tooltip"]).toMatch("Bob, Marie +1")
    expect(wrapper).toMatchSnapshot()
  })

  it("hides tooltip if not enabled", () => {
    const wrapper = shallowMount(Group, {
      propsData: {
        users,
      },
    })

    expect(wrapper.attributes()["uk-tooltip"]).toBeFalsy()
  })
})
