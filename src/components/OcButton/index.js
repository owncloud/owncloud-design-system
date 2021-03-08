import OcButton from "./OcButton.vue"

const Component = {
  install(app) {
    app.component(OcButton.name, OcButton)
  },
}

export default Component

export { OcButton }
