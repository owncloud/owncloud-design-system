import { mount } from "@vue/test-utils"
import Table from "./OcTable.vue"

const ASC = "ascending"
const DESC = "descending"
const NONE = "none"

const tableFieldId = {
  name: "id",
  title: "Id",
  sortable: true,
  sortDir: "desc",
}
const tableFieldResource = {
  name: "resource",
  title: "Resource",
  sortable: true,
  sortDir: "asc",
}
const tableFields = [
  {
    name: "selected",
    title: "Select",
  },
  tableFieldId,
  tableFieldResource,
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
      stubs: {
        "oc-icon": true,
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
    it.each([
      [
        ASC,
        {
          sortBy: tableFieldId.name,
          sortDir: "asc",
          ariaSort: ASC,
        },
      ],
      [
        DESC,
        {
          sortBy: tableFieldId.name,
          sortDir: "desc",
          ariaSort: DESC,
        },
      ],
      [
        NONE,
        {
          sortBy: tableFieldResource.name,
          sortDir: "asc",
          ariaSort: NONE,
        },
      ],
    ])(
      "has the correct [aria-sort] = %s attribute according to the active sort direction of the ID column",
      async (name, { sortBy, sortDir, ariaSort }) => {
        await wrapper.setProps({
          sortBy,
          sortDir,
        })
        expect(headers.at(1).attributes()["aria-sort"]).toBe(ariaSort)
      }
    )
  })

  describe("emits sort events", () => {
    it("toggles the sort direction when repeatedly clicking on the same column", async () => {
      const wrapper = mount(Table, {
        propsData: {
          fields: tableFields,
          sortBy: tableFieldId.name,
          sortDir: tableFieldId.sortDir,
          data,
        },
        stubs: {
          "oc-icon": true,
        },
      })

      const headers = wrapper.findAll("thead th")
      const th1 = headers.at(1)

      await th1.trigger("click")
      expect(wrapper.emitted("sort")[0]).toMatchObject([
        {
          sortBy: tableFieldId.name,
          sortDir: tableFieldId.sortDir === "asc" ? "desc" : "asc",
        },
      ])
    })
    it.each([
      [
        "clicking on a new column",
        {
          sortByOld: tableFieldId.name,
          sortDirOld: tableFieldId.sortDir,
          sortByNew: tableFieldResource.name,
          sortDirNew: tableFieldResource.sortDir,
        },
      ],
      [
        "no direction was set before",
        {
          sortByOld: tableFieldId.name,
          sortDirOld: undefined,
          sortByNew: tableFieldResource.name,
          sortDirNew: tableFieldResource.sortDir,
        },
      ],
    ])(
      "sets the default sort direction from the field when %s",
      async (name, { sortByOld, sortDirOld, sortByNew, sortDirNew }) => {
        const wrapper = mount(Table, {
          propsData: {
            fields: tableFields,
            data,
            sortBy: sortByOld,
            sortDir: sortDirOld,
          },
          stubs: {
            "oc-icon": true,
          },
        })

        const headers = wrapper.findAll("thead th")
        const th2 = headers.at(2)

        await th2.trigger("click")
        expect(wrapper.emitted("sort")[0]).toMatchObject([
          {
            sortBy: sortByNew,
            sortDir: sortDirNew,
          },
        ])
      }
    )
  })
})
