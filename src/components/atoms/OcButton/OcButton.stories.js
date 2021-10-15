import OcButton from "./OcButton.vue"

export default {
  component: OcButton,
  title: "Atoms/Button",
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["button", "a", "router-link"],
    },
    disabled: {
      control: { type: "boolean" },
      defaultValue: false,
    },
    size: {
      control: { type: "select" },
      defaultValue: "medium",
      options: ["small", "medium", "large"],
    },
    // TODO: Neither "input" nor "string" are working, what's the necessary value here?
    href: {
      control: { type: "string" },
      defaultValue: null,
    },
    to: {
      control: { type: "object" },
      defaultValue: null,
    },
    // TODO: Neither "input" nor "string" are working, what's the necessary value here?
    ariaLabel: {
      control: { type: "input" },
      defaultValue: null,
    },
    submit: {
      control: { type: "select" },
      defaultValue: null,
      options: [null, "submit"],
    },
    variation: {
      control: { type: "select" },
      defaultValue: "passive",
      options: ["passive", "primary", "success", "danger", "warning", "inverse"],
    },
    appearance: {
      control: { type: "select" },
      defaultValue: "outline",
      options: ["filled", "outline", "raw"],
    },
    stopClassPropagation: {
      control: { type: "boolean" },
      defaultValue: false,
    },
    justifyContent: {
      control: { type: "select" },
      defaultValue: "center",
      options: ["left", "center", "right", "space-around", "space-between", "space-evenly"],
    },
    gapSize: {
      control: { type: "select" },
      defaultValue: "medium",
      options: ["none", "xsmall", "small", "medium", "large", "xlarge"],
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { OcButton },
  data() {
    return {
      args: { label: args.text, ...args },
    }
  },
  // TODO: How to make buttonText editable?
  // TODO: How to make onClick event handler work? (For Actions addon)
  template: `<oc-button @onClick="onClick" v-bind="$props">${args.text}</oc-button>`,
})

export const Example = Template.bind({})
Example.args = {
  buttonText: "Make me editable please!",
}
