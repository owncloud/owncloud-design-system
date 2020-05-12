// Transform webpack require function
require("babel-plugin-require-context-hook/register")()

import Vue from "vue"

// mock for the router-link
Vue.component("RouterLink", {
  props: {
    tag: { type: String, default: "a" },
  },
  render(createElement) {
    return createElement(this.tag, {}, this.$slots.default)
  },
})