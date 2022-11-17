import { shallowMount } from "@vue/test-utils"

import Pagination from "./OcPagination.vue"

const defaultProps = {
  pages: 5,
  currentPage: 3,
  currentRoute: { name: "files" },
}

const selectors = {
  listItemPage: ".oc-pagination-list-item-page",
  listItemCurrent: ".oc-pagination-list-item-current",
  listItemPrevious: ".oc-pagination-list-item-prev",
  listItemNext: ".oc-pagination-list-item-next",
  listItemEllipsis: ".oc-pagination-list-item-ellipsis",
  listItemLink: ".oc-pagination-list-item-link",
}

function getWrapper(props = {}) {
  return shallowMount(Pagination, {
    propsData: { ...defaultProps, ...props },
  })
}

describe("OcPagination", () => {
  it("displays all pages", () => {
    const wrapper = getWrapper()

    expect(wrapper.findAll(selectors.listItemPage).length).toBe(5)
    expect(wrapper.findAll(selectors.listItemCurrent).length).toBe(1)
  })

  it("displays prev and next links", () => {
    const wrapper = getWrapper()

    expect(wrapper.find(selectors.listItemPrevious).exists()).toBeTruthy()
    expect(wrapper.find(selectors.listItemNext).exists()).toBeTruthy()
  })

  it("hides prev link if the current page is the first page", () => {
    const wrapper = getWrapper({ currentPage: 1 })

    expect(wrapper.find(selectors.listItemPrevious).exists()).toBeFalsy()
    expect(wrapper.find(selectors.listItemNext).exists()).toBeTruthy()
  })

  it("hides next link if the current page is the last page", () => {
    const wrapper = getWrapper({ currentPage: 5 })

    expect(wrapper.find(selectors.listItemPrevious).exists()).toBeTruthy()
    expect(wrapper.find(selectors.listItemNext).exists()).toBeFalsy()
  })

  it("truncates pages if maxDisplayed prop is set", () => {
    const wrapper = getWrapper({
      pages: 10,
      currentPage: 5,
      maxDisplayed: 3,
    })

    expect(wrapper.findAll(selectors.listItemEllipsis).length).toBe(2)
    expect(wrapper.findAll(selectors.listItemLink).length).toBe(4)
    expect(wrapper.findAll(selectors.listItemCurrent).length).toBe(1)
  })

  it("does not truncates pages if length of pages is the same as with ...", async () => {
    const wrapper = getWrapper({
      pages: 4,
      currentPage: 1,
      maxDisplayed: 3,
    })

    expect(wrapper.find(selectors.listItemEllipsis).exists()).toBeFalsy()
    expect(wrapper.find(selectors.listItemPrevious).exists()).toBeFalsy()
    expect(wrapper.find(selectors.listItemNext).exists()).toBeTruthy()

    await wrapper.setProps({ currentPage: 2 })

    expect(wrapper.find(selectors.listItemEllipsis).exists()).toBeFalsy()
    expect(wrapper.find(selectors.listItemPrevious).exists()).toBeTruthy()
    expect(wrapper.find(selectors.listItemNext).exists()).toBeTruthy()

    await wrapper.setProps({ currentPage: 4 })

    expect(wrapper.find(selectors.listItemEllipsis).exists()).toBeFalsy()
    expect(wrapper.find(selectors.listItemPrevious).exists()).toBeTruthy()
    expect(wrapper.find(selectors.listItemNext).exists()).toBeFalsy()

    await wrapper.setProps({ pages: 10 })

    expect(wrapper.find(selectors.listItemEllipsis).exists()).toBeTruthy()
  })

  it("doesn't show ellipsis if maxDisplayed prop is set but no pages are removed", () => {
    const wrapper = getWrapper({ maxDisplayed: 3 })

    expect(wrapper.findAll(selectors.listItemEllipsis).length).toBe(0)
    expect(wrapper.findAll(selectors.listItemLink).length).toBe(4)
    expect(wrapper.findAll(selectors.listItemCurrent).length).toBe(1)
  })

  it("logs error if maxDisplayed prop is not an even number", () => {
    console.error = jest.fn()

    getWrapper({ maxDisplayed: 2 })

    // Error is called twice because of a default Vue validator error and our custom message
    expect(console.error).toHaveBeenCalledTimes(2)
  })

  it("builds correct prev and next links", () => {
    const localThis = {
      ...defaultProps,
      bindPageLink: Pagination.methods.bindPageLink,
      $_currentPage: 3,
    }

    expect(Pagination.computed.previousPageLink.call(localThis)).toMatchObject({
      name: "files",
      query: { page: 2 },
    })
    expect(Pagination.computed.nextPageLink.call(localThis)).toMatchObject({
      name: "files",
      query: { page: 4 },
    })
  })
})
