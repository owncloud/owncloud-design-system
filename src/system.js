/**
 * System.js creates the Design System Library.
 * It’s used in the system itself and when exporting it.
 *
 * You should & can add your own dependencies here if needed.
 */

import "./styles/styles.scss"
import { getSizeClass } from "./utils/sizeClasses.js"
import './utils/webFontLoader.js'

const exportContext = ctx =>
  ctx.keys().reduce((acc, key) => {
    const exp = ctx(key).default || ctx(key)
    const name =
      exp.name ||
      key
        .split("/")
        .pop()
        .replace(/\.[^/.]+$/, "")
    acc[name] = exp
    return acc
  }, {})

export * as composables from "./composables"
export const utils = { getSizeClass }
export const components = exportContext(require.context("./components/", true, /\.vue$/))
export const directives = exportContext(require.context("./directives/", true, /\.js$/))
export const helpers = exportContext(require.context("./helpers/", true, /\.js$/))
export const mixins = exportContext(require.context("./mixins/", true, /\.js$/))

const initializeCustomProps = (tokens = [], prefix) => {
  for (const param in tokens) {
    document.querySelector(":root").style.setProperty("--oc-" + prefix + param, tokens[param])
  }
}

// Install the above defined components
const System = {
  install(Vue, options = {}) {
    const themeOptions = options.tokens
    initializeCustomProps(themeOptions?.breakpoints, "breakpoint-")
    initializeCustomProps(themeOptions?.colorPalette, "color-")
    initializeCustomProps(themeOptions?.fontSizes, "font-size-")
    initializeCustomProps(themeOptions?.sizes, "size-")
    initializeCustomProps(themeOptions?.spacing, "space-")

    Object.keys(components).forEach(name => Vue.component(name, components[name]))
    Object.keys(directives).forEach(name => Vue.directive(name, directives[name]))
  },
}

// Finally export as default
export default System
