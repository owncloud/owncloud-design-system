import { mount } from "@vue/test-utils"
import { DateTime } from "luxon"

import Table from "./OcTableFiles.vue"

const getCurrentDate = () => {
  return DateTime.fromJSDate(new Date()).minus({ days: 1 }).toFormat("EEE, dd MMM yyyy HH:mm:ss")
}

const fields = ["name", "size", "mdate", "sdate", "ddate", "actions", "owner", "sharedWith"]

const sharedWith = [
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

const owner = [
  {
    id: "bob",
    username: "bob",
    displayName: "Bob",
    avatar:
      "https://images.unsplash.com/photo-1610216705422-caa3fcb6d158?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHwyfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  },
]

const indicators = [
  {
    id: "files-sharing",
    label: "Shared with other people",
    visible: true,
    icon: "group",
    handler: (resource, indicatorId) =>
      alert(`Resource: ${resource.name}, indicator: ${indicatorId}`),
  },
  {
    id: "file-link",
    label: "Shared via link",
    visible: true,
    icon: "link",
  },
]

const resourcesWithAllFields = [
  {
    id: "forest",
    name: "forest.jpg",
    path: "images/nature/forest.jpg",
    preview: "https://cdn.pixabay.com/photo/2015/09/09/16/05/forest-931706_960_720.jpg",
    indicators,
    type: "file",
    size: "111000234",
    mdate: getCurrentDate(),
    sdate: getCurrentDate(),
    ddate: getCurrentDate(),
    owner,
    sharedWith,
  },
  {
    id: "notes",
    name: "notes.txt",
    path: "/Documents/notes.txt",
    icon: "text",
    indicators,
    type: "file",
    size: "big",
    mdate: getCurrentDate(),
    sdate: getCurrentDate(),
    ddate: getCurrentDate(),
    sharedWith,
    owner,
  },
  {
    id: "documents",
    name: "Documents",
    path: "/Documents",
    icon: "folder",
    indicators,
    type: "folder",
    size: "-1",
    mdate: getCurrentDate(),
    sdate: getCurrentDate(),
    ddate: getCurrentDate(),
    sharedWith,
    owner,
  },
]

describe("OcTableFiles", () => {
  // As we do not care about design here, we can render the full set of fields
  // Since we are using mount, use it only once to save some time
  const wrapper = mount(Table, {
    propsData: {
      resources: resourcesWithAllFields,
      selection: [],
      slots: {
        status: "<div class='status-slot'>Hello world!</div>",
      },
    },
  })

  it("displays all fields", () => {
    for (const field of fields) {
      expect(wrapper.findAll(".oc-table-header-cell-" + field).length).toEqual(1)
      expect(wrapper.findAll(".oc-table-data-cell-" + field).length).toEqual(
        resourcesWithAllFields.length
      )
    }
  })

  it("emits showDetails event when clicking on the button in actions column", () => {
    wrapper.find(".oc-table-data-cell-actions .oc-table-files-btn-show-details").vm.$emit("click")

    expect(wrapper.emitted().showDetails).toBeTruthy()
  })

  it("emits showDetails event when clicking on the row", async () => {
    wrapper.find(".oc-tbody-tr").trigger("click")

    await wrapper.vm.$nextTick()

    expect(wrapper.emitted().showDetails.length).toEqual(2)
  })

  it("formats the resource size", () => {
    expect(wrapper.find(".oc-tbody-tr-forest .oc-table-data-cell-size").text()).toEqual("105.9 MB")
    expect(wrapper.find(".oc-tbody-tr-documents .oc-table-data-cell-size").text()).toEqual("--")
    expect(wrapper.find(".oc-tbody-tr-notes .oc-table-data-cell-size").text()).toEqual("?")
  })

  it("selects resources", () => {
    wrapper.find(".oc-table-files-select-all .oc-checkbox").trigger("click")
    wrapper.find(".oc-tbody-tr-documents .oc-checkbox").trigger("click")
    expect(wrapper.emitted().select.length).toBe(2)
  })

  it("de-selects all resources", () => {
    const wrapperSelected = mount(Table, {
      propsData: {
        resources: resourcesWithAllFields,
        selection: ["forest", "notes", "documents"],
      },
    })

    wrapperSelected.find(".oc-table-files-select-all .oc-checkbox").trigger("click")
    expect(wrapperSelected.emitted().select[0][0].length).toBe(0)
  })

  it("emits fileClick", () => {
    wrapper.find(".oc-tbody-tr-forest .oc-resource-name").trigger("click")

    expect(wrapper.emitted().fileClick[0][0].name).toMatch("forest.jpg")
  })
})
