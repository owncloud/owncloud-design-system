import OcAccordion from './OcAccordion.vue';
import {mount} from '@vue/test-utils';
import OcAccordionItem from './OcAccordionItem.vue';
import OcIcon from './OcIcon.vue';
import OcButton from './OcButton.vue';

const stubs = {
  'oc-accordion-item': OcAccordionItem,
  'oc-button': OcButton,
  'oc-icon': OcIcon
}

const singleAccordionItemSlot = '<oc-accordion-item title="My accordion item" icon="folder">' +
  '<p>I am the content of this accordion</p>' +
  '</oc-accordion-item>'

const multipleItemsSlot = '<oc-accordion-item title="First accordion item">' +
  '<p class="first-item-message">Hello there first.</p>' +
  '</oc-accordion-item>' +
  '<oc-accordion-item title="Second accordion item">' +
  '<p class="second-item-message">Hello here second.</p>' +
  '</oc-accordion-item>'

describe('OcAccordion', () => {
  /**
   * @param {Object} props
   * @param {string} slot
   * @returns {Wrapper<Vue>}
   */
  function getWrapperWithSlotAndProps(props, slot=singleAccordionItemSlot) {
    return mount(OcAccordion, {
      slots: {
        default: slot
      },
      propsData: {
        ...props
      },
      stubs
    })
  }
  describe("when item title is clicked", () => {
    it('should be able to toggle expanded', async () => {
      const wrapper = await getWrapperWithSlotAndProps({ expandFirst: false })
      expect(wrapper.find("p").exists()).toBeFalsy()
      await wrapper.find('.oc-accordion-title button').trigger('click')
      await wrapper.vm.$nextTick()
      expect(wrapper.find("p").exists()).toBeTruthy()
    })
  })
  describe('item expand more icon', () => {
    describe('when accordion item is collapsed', () => {
      it('should not have class rotate', async () => {
        const wrapper = await getWrapperWithSlotAndProps({ expandFirst: false })
        const arrowIconElement = wrapper.find(".oc-accordion-title-arrow-icon")
        expect(arrowIconElement.exists()).toBeTruthy()
        expect(arrowIconElement.attributes("class")).not.toContain("rotate")
      })
    })
    describe('when accordion item is expanded', () => {
      it('should have class rotate', async () => {
        const wrapper = await getWrapperWithSlotAndProps({ expandFirst: true })
        const arrowIconElement = wrapper.find(".oc-accordion-title-arrow-icon")
        expect(arrowIconElement.exists()).toBeTruthy()
        expect(arrowIconElement.attributes("class")).toContain("rotate")
      })
    })
  })
  describe("multiple items in accordion", () => {
    describe("when multiple prop is false and multiple items are given", () => {
      it('renders all items in slot data', async () => {
        const wrapper = await getWrapperWithSlotAndProps(
          { multiple: false },
          multipleItemsSlot
        )
        expect(wrapper.findAll('.oc-accordion-title').length).toBe(2)
        expect(wrapper.findAll('.oc-accordion-content').length).toBe(2)
      })
    })
    describe("when multiple prop is true and multiple items are given", () => {
      it('renders all items in slot data', async () => {
        const wrapper = await getWrapperWithSlotAndProps(
          { multiple: true },
          multipleItemsSlot
        )
        expect(wrapper.findAll('.oc-accordion-title').length).toBe(2)
        expect(wrapper.findAll('.oc-accordion-content').length).toBe(2)
      })
    })
    describe("when a specific item is expanded", () => {
      it('should display only expanded item\'s content', async () => {
        const wrapper = await getWrapperWithSlotAndProps(
          { multiple: true },
          multipleItemsSlot
        )
        expect(wrapper.find(".first-item-message").exists()).toBeFalsy()
        expect(wrapper.find(".second-item-message").exists()).toBeFalsy()
        await wrapper.findAll('.oc-accordion-title button').at(0).trigger('click')
        await wrapper.vm.$nextTick()
        expect(wrapper.find(".first-item-message").exists()).toBeTruthy()
        expect(wrapper.find(".second-item-message").exists()).toBeFalsy()
      })
    })
    describe("when multiple items are expanded", () => {
      it('should display every expanded item\'s content', async () => {
        const wrapper = await getWrapperWithSlotAndProps(
          { multiple: true },
          multipleItemsSlot
        )
        expect(wrapper.find(".first-item-message").exists()).toBeFalsy()
        expect(wrapper.find(".second-item-message").exists()).toBeFalsy()
        await wrapper.findAll('.oc-accordion-title button').at(0).trigger('click')
        await wrapper.vm.$nextTick()
        await wrapper.findAll('.oc-accordion-title button').at(1).trigger('click')
        expect(wrapper.find(".first-item-message").exists()).toBeTruthy()
        expect(wrapper.find(".second-item-message").exists()).toBeTruthy()
      })
    })
  })
})
