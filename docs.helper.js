/**
 * This is ownCloud Design System’s JS helper file for docs.
 * You can add more things if/when needed.
 */
import Vue from "vue"
import WebFontLoader from "../src/utils/webFontLoader" // eslint-disable-line no-unused-vars
import statusLabels from "./utils/statusLabels"
import activeNav from "./utils/activeNav"
import filterSearch from "./utils/filterSearch"
import "codemirror/mode/jsx/jsx"

Vue.config.productionTip = false
Vue.mixin(statusLabels)

document.addEventListener("DOMContentLoaded", () => {
  filterSearch.methods.init()
  activeNav.methods.init()
})

window.addEventListener("hashchange", () => {
  filterSearch.methods.init()
  activeNav.methods.init()
})

// mock for the router-link
Vue.component("RouterLink", {
  props: {
    tag: { type: String, default: "a" },
  },
  render(createElement) {
    return createElement(this.tag, {}, this.$slots.default)
  },
})
