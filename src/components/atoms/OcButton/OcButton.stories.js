import OcButton from "./OcButton.vue"

export default {
  component: OcButton,
  title: "Atoms/Button",
}

export const Standard = () => ({
  components: { OcButton },
  template: "<oc-button>CLICK ME!</oc-button>",
})

export const Disabled = () => ({
  components: { OcButton },
  template: "<oc-button disabled>CLICK ME!</oc-button>",
})
