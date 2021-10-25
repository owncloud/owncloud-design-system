import { action } from "@storybook/addon-actions"
import OcTextarea from "./OcTextarea.vue"
import uniqueId from "../../../utils/uniqueId"

export default {
  component: OcTextarea,
  title: "Atoms/Textarea",
  parameters: {
    controls: { sort: "alpha" },
  },
  argTypes: {
    id: {
      control: { type: "text" },
      required: false,
      defaultValue: uniqueId("oc-textarea-"),
    },
    value: {
      control: { type: "text" },
      defaultValue: null,
    },
    label: {
      control: { type: "text" },
      required: true,
      defaultValue: null,
    },
    warningMessage: {
      control: { type: "text" },
      defaultValue: null,
    },
    errorMessage: {
      control: { type: "text" },
      defaultValue: null,
    },
    descriptionMessage: {
      control: { type: "text" },
      defaultValue: null,
    },
    fixMessageLine: {
      control: { type: "boolean" },
      defaultValue: false,
    },
    submitOnEnter: {
      control: { type: "boolean" },
      required: false,
      defaultValue: true,
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { OcTextarea },
  template: `<oc-textarea @focus="focus" @input="input" @keydown="keydown" v-bind="$props" />`,
  methods: { focus: action("focus"), input: action("input"), keydown: action("keydown") },
})

export const Component = Template.bind({})
Component.args = {
  label: "Textarea",
}
