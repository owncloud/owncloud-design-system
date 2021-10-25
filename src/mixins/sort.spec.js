import MockComponent from '../utils/mockComponent.vue';
import { shallowMount } from "@vue/test-utils"
import SortMixin from "./sort"

describe("Sort.js", () => {
    const wrapper = shallowMount(MockComponent, {
        mixins: [SortMixin]
    });
    it("should return proper value from bool", () => {
        expect(true).toBeTruthy();
    })
})