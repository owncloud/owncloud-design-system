import { action } from "@storybook/addon-actions"
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
    href: {
      control: { type: "text" },
      defaultValue: "https://owncloud.design",
    },
    to: {
      control: { type: "object" },
      defaultValue: null,
    },
    ariaLabel: {
      control: { type: "text" },
      defaultValue: "Click me for magic",
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
      args: { onClick: { action: "clicked" }, ...args },
    }
  },
  // TODO: Text changes only after refreshing the browser
  template: `<oc-button @click="action" v-bind="$props">${args.text}</oc-button>`,
  methods: { action: action("clicked") },
})

export const Component = Template.bind({})
Component.args = {
  text: "Button",
}
