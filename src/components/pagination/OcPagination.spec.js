import { shallowMount } from "@vue/test-utils"

import Pagination from "./OcPagination.vue"

const defaultProps = {
  pages: 5,
  currentPage: 3,
  currentRoute: '/files'
}

describe("OcPagination", () => {
  it("displays all pages", async () => {
    const wrapper = shallowMount(Pagination, {
      propsData: defaultProps,
    })

    expect(wrapper.findAll(".oc-pagination-list-item-page").length).toBe(5)
    expect(wrapper.findAll(".oc-pagination-list-item-current").length).toBe(1)
  })

  it("displays prev and next links", () => {
    const wrapper = shallowMount(Pagination, {
      propsData: defaultProps
    })

    expect(wrapper.find(".oc-pagination-list-item-prev").exists()).toBeTruthy()
    expect(wrapper.find(".oc-pagination-list-item-next").exists()).toBeTruthy()
  })

  it("hides prev link if the current page is the first page", () => {
    const wrapper = shallowMount(Pagination, {
      propsData: {
        ...defaultProps,
        currentPage: 1
      }
    })

    expect(wrapper.find(".oc-pagination-list-item-prev").exists()).toBeFalsy()
    expect(wrapper.find(".oc-pagination-list-item-next").exists()).toBeTruthy()
  })

  it("hides next link if the current page is the last page", () => {
    const wrapper = shallowMount(Pagination, {
      propsData: {
        ...defaultProps,
        currentPage: 5
      }
    })

    expect(wrapper.find(".oc-pagination-list-item-prev").exists()).toBeTruthy()
    expect(wrapper.find(".oc-pagination-list-item-next").exists()).toBeFalsy()
  })

  it("truncates pages if maxDisplayed prop is set", () => {
    const wrapper = shallowMount(Pagination, {
      propsData: {
        pages: 10,
        currentPage: 5,
        maxDisplayed: 2,
        currentRoute: '/files',
      }
    })

    expect(wrapper.findAll(".oc-pagination-list-item-ellipsis").length).toBe(2)
    expect(wrapper.findAll(".oc-pagination-list-item-link").length).toBe(4)
    expect(wrapper.findAll(".oc-pagination-list-item-current").length).toBe(1)
  })

  it("doesn't show ellipsis if maxDisplayed prop is set but no pages are removed", () => {
    const wrapper = shallowMount(Pagination, {
      propsData: {
        pages: 5,
        currentPage: 3,
        maxDisplayed: 2,
        currentRoute: '/files',
      }
    })

    expect(wrapper.findAll(".oc-pagination-list-item-ellipsis").length).toBe(0)
    expect(wrapper.findAll(".oc-pagination-list-item-link").length).toBe(4)
    expect(wrapper.findAll(".oc-pagination-list-item-current").length).toBe(1)
  })

  it('logs error if maxDisplayed prop is not an even number', () => {
    console.error = jest.fn()

    shallowMount(Pagination, {
      propsData: {
        pages: 5,
        currentPage: 3,
        maxDisplayed: 1,
        currentRoute: '/files',
      }
    })

    // Error is called twice because of a default Vue validator error and our custom message
    expect(console.error).toHaveBeenCalledTimes(2)
  })

  it("builds correct prev and next links", () => {
    const wrapper = shallowMount(Pagination, {
      propsData: defaultProps
    })

    expect(wrapper.find(".oc-pagination-list-item-prev").attributes().to).toMatch('/files/2')
    expect(wrapper.find(".oc-pagination-list-item-next").attributes().to).toMatch('/files/4')
  })

  it('removes trailing slash from the current route', () => {
    const wrapper = shallowMount(Pagination, {
      propsData: defaultProps,
      currentRoute: '/files/'
    })

    expect(wrapper.findAll(".oc-pagination-list-item-link").at(0).attributes().to).toMatch('/files/1')
  })
})
