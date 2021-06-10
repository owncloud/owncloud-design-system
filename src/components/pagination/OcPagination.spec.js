import { shallowMount } from "@vue/test-utils"

import Pagination from "./OcPagination.vue"

const defaultProps = {
  pages: 5,
  currentPage: 3,
  currentRoute: { name: 'files' },
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
        currentRoute: { name: 'files' },
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
        currentRoute: { name: 'files' },
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
        currentRoute: { name: 'files' },
      }
    })

    // Error is called twice because of a default Vue validator error and our custom message
    expect(console.error).toHaveBeenCalledTimes(2)
  })

  it("builds correct prev and next links", () => {
    const localThis = { ...defaultProps, bindPageLink: Pagination.methods.bindPageLink, $_currentPage: 3 }

    expect(Pagination.computed.previousPageLink.call(localThis)).toMatchObject({ name: 'files', params: { page: 2 } })
    expect(Pagination.computed.nextPageLink.call(localThis)).toMatchObject({ name: 'files', params: { page: 4 }})
  })

  it("renders go to button as a link if a page is specified", async () => {
    const wrapper = shallowMount(Pagination, {
      propsData: {
        ...defaultProps,
        pages: 50,
        currentPage: 13,
        maxDisplayed: 2
      }
    })

    await wrapper.setData({ goToTarget: 30 })

    expect(wrapper.find('router-link-stub.oc-pagination-list-item-goto-link').exists()).toBe(true)
  })

  it("sets goToTarget to last page if its value is higher", async () => {
    const wrapper = shallowMount(Pagination, {
      propsData: defaultProps
    })

    await wrapper.setData({ goToTarget: 8 })
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.goToTarget).toBe('5')
  })
})
