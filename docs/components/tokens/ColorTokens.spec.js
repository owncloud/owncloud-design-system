import Vue from "vue"
import ColorTokens from "./ColorTokens.vue"

const Constructor = Vue.extend(ColorTokens)
const vm = new Constructor().$mount()

describe("ColorTokens.vue", () => {
  it("should render correct contents", () => {
    expect(vm.$el.querySelector(".color")).toBeDefined()
  })

  it("should render multiple colors", () => {
    expect(vm.$el.querySelectorAll(".color").length).toBeGreaterThan(2)
  })

  it("should create code elements for copy pasting", () => {
    expect(vm.$el.querySelector(".color span")).toBeDefined()
  })

  it("should create swatches and apply inline styles", () => {
    expect(vm.$el.querySelector(".color .swatch").style).toBeDefined()
  })

  it("should create multiple color groups", () => {
    expect(vm.$el.querySelector(".color_group_2")).toBeDefined()
  })
})
