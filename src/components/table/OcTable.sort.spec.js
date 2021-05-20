import { mount } from "@vue/test-utils"
import Table from "./OcTable.vue"

const ASC = "ascending"
const DESC = "descending"
const NONE = "none"

const sortedFields = [
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
    id: "111000234",
    resource: "id-1",
  },
  {
    id: 1245,
    resource: "id-3",
  },
  {
    id: "5324435",
    resource: "id-2",
  },
]

describe("OcTable.sort", () => {
  it("does not sort without enabling it", async () => {
    const fields = [...sortedFields].map(f => ({ name: f.name, title: f.title }))
    const wrapper = mount(Table, {
      propsData: {
        fields,
        data,
      },
    })
    expect(wrapper.findAll("[aria-sort]").length).toBeFalsy()
  })

  it("has all required sort attributes", async () => {
    const wrapper = mount(Table, {
      propsData: {
        fields: sortedFields,
        data,
      },
    })

    expect(wrapper.findAll("[aria-sort]").length).toBe(2)
  })

  it("can sort", async () => {
    const wrapper = mount(Table, {
      propsData: {
        fields: sortedFields,
        data,
      },
    })
    const headers = wrapper.findAll("thead th")
    const th1 = headers.at(0)
    const th2 = headers.at(1)

    await th1.trigger("click")
    expect(th1.attributes("aria-sort")).toBe(DESC)
    expect(th2.attributes("aria-sort")).toBe(NONE)
    expect(wrapper.findAll("tbody tr td").at(0).text()).toBe("1245")
    expect(wrapper.findAll("tbody tr td").at(1).text()).toBe("id-3")

    await th1.trigger("click")
    expect(th1.attributes("aria-sort")).toBe(ASC)
    expect(th2.attributes("aria-sort")).toBe(NONE)
    expect(wrapper.findAll("tbody tr td").at(0).text()).toBe("111000234")
    expect(wrapper.findAll("tbody tr td").at(1).text()).toBe("id-1")

    await th2.trigger("click")
    expect(th1.attributes("aria-sort")).toBe(NONE)
    expect(th2.attributes("aria-sort")).toBe(ASC)
    expect(wrapper.findAll("tbody tr td").at(0).text()).toBe("1245")
    expect(wrapper.findAll("tbody tr td").at(1).text()).toBe("id-3")

    await th2.trigger("click")
    expect(th1.attributes("aria-sort")).toBe(NONE)
    expect(th2.attributes("aria-sort")).toBe(DESC)
    expect(wrapper.findAll("tbody tr td").at(0).text()).toBe("111000234")
    expect(wrapper.findAll("tbody tr td").at(1).text()).toBe("id-1")
  })
})
