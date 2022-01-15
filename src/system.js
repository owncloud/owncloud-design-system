import "./styles/styles.scss"
import atoms from "./components/atoms/**/*.vue"
import molecules from "./components/molecules/**/*.vue"
import organisms from "./components/organisms/**/*.vue"
import directivesContext from "./directives/**/*.js"

const componentsContext = [...atoms, ...organisms, ...molecules]

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

    componentsContext.forEach(c => Vue.component(c.default.name, c.default))
    directivesContext.forEach(d => Vue.directive(d.default.name, d.default))
  },
}

// Finally export as default
export default System
