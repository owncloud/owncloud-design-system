import { mount } from "@vue/test-utils"

import Resource from "./OcResource.vue"

const fileResource = {
  name: "forest.jpg",
  path: "nature/forest.jpg",
  thumbnail: "https://cdn.pixabay.com/photo/2015/09/09/16/05/forest-931706_960_720.jpg",
  indicators: [],
  type: "file",
  extension: "jpg"
}
const folderResource = {
  name: "Documents",
  path: "",
  indicators: [],
  type: "folder",
}

describe("OcResource", () => {
  it("doesn't emit a click if the resource is a folder", () => {
    const wrapper = mount(Resource, {
      propsData: {
        resource: folderResource,
        targetRoute: {
          name: "tests-route",
        },
      },
    })

    wrapper.find(".oc-resource-name").trigger("click")
    expect(wrapper.emitted().click).toBeFalsy()
  })

  it("doesn't emit a click if the resource is not clickable", () => {
    const wrapper = mount(Resource, {
      propsData: {
        resource: fileResource,
        isResourceClickable: false,
      },
    })

    wrapper.find(".oc-resource-name").trigger("click")
    expect(wrapper.emitted().click).toBeFalsy()
  })

  it("emits a click", () => {
    const wrapper = mount(Resource, {
      propsData: {
        resource: fileResource,
      },
    })

    wrapper.find(".oc-resource-name").trigger("click")
    expect(wrapper.emitted().click).toBeTruthy()
  })
})
