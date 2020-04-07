import Vue from "vue"
import Spacing from "./Spacing.vue"

const Constructor = Vue.extend(Spacing)
const vm = new Constructor().$mount()

describe("Spacing.vue", () => {
  it("should render correct contents", () => {
    expect(vm.$el.querySelector(".space")).toBeDefined()
  })

  it("should render multiple sizes", () => {
    expect(vm.$el.querySelectorAll(".space").length).toBeGreaterThan(2)
  })

  it("should create px sizes for copy pasting", () => {
    expect(vm.$el.querySelector(".space span")).toBeDefined()
  })

  it("should create apply inline styles", () => {
    expect(vm.$el.querySelector(".space").style).toBeDefined()
  })
})
