// Transform webpack require function
require("babel-plugin-require-context-hook/register")()

import Vue from "vue"
import { config } from "@vue/test-utils"

config.mocks["$gettext"] = str => str
config.mocks["$ngettext"] = str => str
config.mocks["$gettextInterpolate"] = str => str
config.mocks["$language"] = {
  current: "en_US",
}

Vue.component("RouterLink", {
  props: {
    tag: { type: String, default: "a" },
    to: { type: [String, Object], default: "" },
  },
  render(createElement) {
    let path = this.$props.to

    if (!!path && typeof path !== "string") {
      path = this.$props.to.path || this.$props.to.name

      if (this.$props.to.params) {
        path += "/" + Object.values(this.$props.to.params).join("/")
      }

      if (this.$props.to.query) {
        path += "?" + Object.values(this.$props.to.query).join("&")
      }
    }

    return createElement(this.tag, { attrs: { href: path } }, this.$slots.default)
  },
})

const directivesContext = require.context("./src/directives/", true, /\.js$/)
directivesContext.keys().forEach(key => {
  Vue.directive(directivesContext(key).default.name, directivesContext(key).default)
})
