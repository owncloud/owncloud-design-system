// Transform webpack require function
require("babel-plugin-require-context-hook/register")()

import Vue from "vue"
import { config } from "@vue/test-utils"

config.mocks["$gettext"] = str => str
config.mocks["$language"] = {
  current: "en_US",
}

Vue.component("RouterLink", {
  props: {
    tag: { type: String, default: "a" },
  },
  render(createElement) {
    return createElement(this.tag, {}, this.$slots.default)
  },
})

const directivesContext = require.context("./src/directives/", true, /\.js$/)
directivesContext.keys().forEach(key => {
  Vue.directive(directivesContext(key).default.name, directivesContext(key).default)
})
