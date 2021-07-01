import { mount } from "@vue/test-utils"

import Table from "./OcTableFiles.vue"

const ASC = "ascending"
const DESC = "descending"
const NONE = "none"

const sharedWithOne = [
  {
    id: "bob",
    username: "bob",
    displayName: "Bob",
  },
]

const sharedWithTwo = [
  {
    id: "marie",
    username: "marie",
    displayName: "Marie",
  },
  {
    id: "john",
    username: "john",
    displayName: "John Richards Emperor of long names",
  },
]

const sharedWithThree = [
  {
    id: "bob",
    username: "bob",
    displayName: "Bob",
  },
  {
    id: "marie",
    username: "marie",
    displayName: "Marie",
  },
  {
    id: "john",
    username: "john",
    displayName: "John Richards Emperor of long names",
  },
]

const firstOwner = sharedWithOne
const secondOwner = []
secondOwner[0] = sharedWithTwo[0]

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
    thumbnail: "https://cdn.pixabay.com/photo/2015/09/09/16/05/forest-931706_960_720.jpg",
    indicators,
    type: "file",
    size: "111000234",
    mdate: "Thu, 01 Jul 2021 08:34:04 GMT",
    owner: firstOwner,
    sharedWith: sharedWithOne,
  },
  {
    id: "notes",
    name: "notes.txt",
    path: "/Documents/notes.txt",
    icon: "text",
    indicators,
    type: "file",
    size: "1245",
    mdate: "Thu, 01 Jul 2021 08:45:04 GMT",
    owner: secondOwner,
    sharedWith: sharedWithTwo,
  },
  {
    id: "documents",
    name: "Documents",
    path: "/Documents",
    icon: "folder",
    indicators,
    type: "folder",
    size: "5324435",
    mdate: "Sat, 09 Jan 2021 14:34:04 GMT",
    owner: firstOwner,
    sharedWith: sharedWithThree,
  },
]

describe("OcTableFiles.sort", () => {
  const wrapper = mount(Table, {
    propsData: {
      resources: resourcesWithAllFields,
    },
  })

  const headers = wrapper.findAll("thead th")

  // headers.at(0) is the selection checkbox
  const sortByName = headers.at(1)
  const sortBySize = headers.at(2)
  const sortBySharedWith = headers.at(3)
  const sortByOwner = headers.at(4)
  const sortByMdate = headers.at(5)

  it("renders all sorting table headers correctly", () => {
    expect(wrapper.findAll("[aria-sort]").length).toBe(5)
  })

  it("displays all fields in initial order", () => {
    let resources = wrapper.findAll(".oc-resource-name")

    expect(resources.at(0).attributes("data-test-resource-name")).toBe("forest.jpg")
    expect(resources.at(1).attributes("data-test-resource-name")).toBe("notes.txt")
    expect(resources.at(2).attributes("data-test-resource-name")).toBe("Documents")
  })

  it("sorts by name", async () => {
    expect(sortByName.attributes("aria-sort")).toBe(NONE)
    expect(sortBySize.attributes("aria-sort")).toBe(NONE)

    await sortByName.trigger("click")

    expect(sortByName.attributes("aria-sort")).toBe(DESC)
    expect(sortBySize.attributes("aria-sort")).toBe(NONE)

    let resourcesOne = wrapper.findAll(".oc-resource-name")

    expect(resourcesOne.at(0).attributes("data-test-resource-name")).toBe("Documents")
    expect(resourcesOne.at(1).attributes("data-test-resource-name")).toBe("forest.jpg")
    expect(resourcesOne.at(2).attributes("data-test-resource-name")).toBe("notes.txt")

    await sortByName.trigger("click")

    expect(sortByName.attributes("aria-sort")).toBe(ASC)

    let resourcesTwo = wrapper.findAll(".oc-resource-name")

    expect(resourcesTwo.at(0).attributes("data-test-resource-name")).toBe("notes.txt")
    expect(resourcesTwo.at(1).attributes("data-test-resource-name")).toBe("forest.jpg")
    expect(resourcesTwo.at(2).attributes("data-test-resource-name")).toBe("Documents")
  })

  it("sorts by size", async () => {
    expect(sortByName.attributes("aria-sort")).toBe(ASC)
    expect(sortBySize.attributes("aria-sort")).toBe(NONE)

    await sortBySize.trigger("click")

    expect(sortByName.attributes("aria-sort")).toBe(NONE)
    expect(sortBySize.attributes("aria-sort")).toBe(ASC)

    let resourcesOne = wrapper.findAll(".oc-resource-name")

    expect(resourcesOne.at(0).attributes("data-test-resource-name")).toBe("forest.jpg")
    expect(resourcesOne.at(1).attributes("data-test-resource-name")).toBe("Documents")
    expect(resourcesOne.at(2).attributes("data-test-resource-name")).toBe("notes.txt")

    await sortBySize.trigger("click")

    expect(sortBySize.attributes("aria-sort")).toBe(DESC)

    let resourcesTwo = wrapper.findAll(".oc-resource-name")

    expect(resourcesTwo.at(0).attributes("data-test-resource-name")).toBe("notes.txt")
    expect(resourcesTwo.at(1).attributes("data-test-resource-name")).toBe("Documents")
    expect(resourcesTwo.at(2).attributes("data-test-resource-name")).toBe("forest.jpg")
  })

  it("sorts by modification date", async () => {
    expect(sortByMdate.attributes("aria-sort")).toBe(NONE)
    expect(sortBySize.attributes("aria-sort")).toBe(DESC)

    await sortByMdate.trigger("click")

    expect(sortByMdate.attributes("aria-sort")).toBe(DESC)
    expect(sortBySize.attributes("aria-sort")).toBe(NONE)

    let resourcesOne = wrapper.findAll(".oc-resource-name")

    expect(resourcesOne.at(0).attributes("data-test-resource-name")).toBe("Documents")
    expect(resourcesOne.at(1).attributes("data-test-resource-name")).toBe("forest.jpg")
    expect(resourcesOne.at(2).attributes("data-test-resource-name")).toBe("notes.txt")

    await sortByMdate.trigger("click")

    expect(sortByMdate.attributes("aria-sort")).toBe(ASC)

    let resourcesTwo = wrapper.findAll(".oc-resource-name")

    expect(resourcesTwo.at(0).attributes("data-test-resource-name")).toBe("notes.txt")
    expect(resourcesTwo.at(1).attributes("data-test-resource-name")).toBe("forest.jpg")
    expect(resourcesTwo.at(2).attributes("data-test-resource-name")).toBe("Documents")
  })

  it("sorts by owner", async () => {
    expect(sortByOwner.attributes("aria-sort")).toBe(NONE)
    expect(sortByMdate.attributes("aria-sort")).toBe(ASC)

    await sortByOwner.trigger("click")

    expect(sortByOwner.attributes("aria-sort")).toBe(ASC)
    expect(sortByMdate.attributes("aria-sort")).toBe(NONE)

    let resourcesOne = wrapper.findAll(".oc-resource-name")

    expect(resourcesOne.at(0).attributes("data-test-resource-name")).toBe("notes.txt")
    expect(resourcesOne.at(1).attributes("data-test-resource-name")).toBe("forest.jpg")
    expect(resourcesOne.at(2).attributes("data-test-resource-name")).toBe("Documents")

    await sortByOwner.trigger("click")

    expect(sortByOwner.attributes("aria-sort")).toBe(DESC)

    let resourcesTwo = wrapper.findAll(".oc-resource-name")

    expect(resourcesTwo.at(0).attributes("data-test-resource-name")).toBe("forest.jpg")
    expect(resourcesTwo.at(1).attributes("data-test-resource-name")).toBe("Documents")
    expect(resourcesTwo.at(2).attributes("data-test-resource-name")).toBe("notes.txt")
  })

  it("sorts by shares", async () => {
    expect(sortBySharedWith.attributes("aria-sort")).toBe(NONE)
    expect(sortByOwner.attributes("aria-sort")).toBe(DESC)

    await sortBySharedWith.trigger("click")

    expect(sortBySharedWith.attributes("aria-sort")).toBe(DESC)
    expect(sortByOwner.attributes("aria-sort")).toBe(NONE)

    let resourcesOne = wrapper.findAll(".oc-resource-name")

    expect(resourcesOne.at(0).attributes("data-test-resource-name")).toBe("forest.jpg")
    expect(resourcesOne.at(1).attributes("data-test-resource-name")).toBe("notes.txt")
    expect(resourcesOne.at(2).attributes("data-test-resource-name")).toBe("Documents")

    await sortBySharedWith.trigger("click")

    expect(sortBySharedWith.attributes("aria-sort")).toBe(ASC)

    let resourcesTwo = wrapper.findAll(".oc-resource-name")

    expect(resourcesTwo.at(0).attributes("data-test-resource-name")).toBe("Documents")
    expect(resourcesTwo.at(1).attributes("data-test-resource-name")).toBe("notes.txt")
    expect(resourcesTwo.at(2).attributes("data-test-resource-name")).toBe("forest.jpg")
  })
})
