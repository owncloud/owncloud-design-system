import { mount } from "@vue/test-utils"
import Table from "./OcTable.vue"

const ASC = "ascending"
const DESC = "descending"
const NONE = "none"

const tableFields = [
  {
    name: "selected",
    title: "Select",
  },
  {
    name: "id",
    title: "Id",
    sortable: true,
  },
  {
    name: "resource",
    title: "Resource",
    sortable: true,
  },
]
const data = [
  {
    selected: false,
    id: "111000234",
    resource: "id-1",
  },
  {
    selected: true,
    id: 1245,
    resource: "id-3",
  },
  {
    selected: false,
    id: "5324435",
    resource: "id-2",
  },
]

describe("OcTable.sort", () => {
  describe("aria-sort", () => {
    const wrapper = mount(Table, {
      propsData: {
        fields: [...tableFields],
        data,
      },
    })
    const headers = wrapper.findAll("thead th")
    it("has any [aria-sort] attribute on all sortable column headers", () => {
      const sortableFields = tableFields.filter(f => f.sortable).map(f => f.name)
      tableFields.forEach((field, index) => {
        if (!sortableFields.includes(field.name)) {
          return
        }
        expect(headers.at(index).attributes()["aria-sort"]).toBeTruthy()
      })
    })
    it("lacks an [aria-sort] attribute on non-sortable column headers", () => {
      const sortableFields = tableFields.filter(f => f.sortable).map(f => f.name)
      tableFields.forEach((field, index) => {
        if (sortableFields.includes(field.name)) {
          return
        }
        expect(headers.at(index).attributes()["aria-sort"]).toBeFalsy()
      })
    })
  })

  it("sorts by the first sortable field by default (= without interaction)", () => {
    const wrapper = mount(Table, {
      propsData: {
        fields: [...tableFields],
        data,
      },
    })
    const firstSortableFieldIndex = tableFields.findIndex(f => f.sortable)
    const headers = wrapper.findAll("thead th")
    for (let i = 0; i < firstSortableFieldIndex; i++) {
      expect(headers.at(i).attributes()["aria-sort"]).toBeFalsy()
    }
    expect(headers.at(firstSortableFieldIndex).attributes()["aria-sort"]).toEqual(DESC)
  })

  it("can sort", async () => {
    const wrapper = mount(Table, {
      propsData: {
        fields: tableFields,
        data,
      },
    })
    const headers = wrapper.findAll("thead th")
    const th1 = headers.at(1)
    const th2 = headers.at(2)

    expect(th1.attributes("aria-sort")).toBe(DESC)
    expect(th2.attributes("aria-sort")).toBe(NONE)
    expect(wrapper.findAll("tbody tr td").at(1).text()).toBe("1245")
    expect(wrapper.findAll("tbody tr td").at(2).text()).toBe("id-3")

    await th1.trigger("click")
    expect(th1.attributes("aria-sort")).toBe(ASC)
    expect(th2.attributes("aria-sort")).toBe(NONE)
    expect(wrapper.findAll("tbody tr td").at(1).text()).toBe("111000234")
    expect(wrapper.findAll("tbody tr td").at(2).text()).toBe("id-1")

    await th2.trigger("click")
    expect(th1.attributes("aria-sort")).toBe(NONE)
    expect(th2.attributes("aria-sort")).toBe(ASC)
    expect(wrapper.findAll("tbody tr td").at(1).text()).toBe("1245")
    expect(wrapper.findAll("tbody tr td").at(2).text()).toBe("id-3")

    await th2.trigger("click")
    expect(th1.attributes("aria-sort")).toBe(NONE)
    expect(th2.attributes("aria-sort")).toBe(DESC)
    expect(wrapper.findAll("tbody tr td").at(1).text()).toBe("111000234")
    expect(wrapper.findAll("tbody tr td").at(2).text()).toBe("id-1")
  })
})
