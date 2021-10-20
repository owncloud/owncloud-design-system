import { action } from "@storybook/addon-actions"
import OcCheckbox from "./OcCheckbox.vue"
import uniqueId from "../../../utils/uniqueId"

export default {
  component: OcCheckbox,
  title: "Atoms/Checkbox",
  parameters: { controls: { sort: "alpha" } },
  argTypes: {
    id: {
      control: { type: "text" },
      required: false,
      defaultValue: uniqueId("oc-checkbox-"),
    },
    disabled: {
      control: { type: "boolean" },
      defaultValue: false,
    },
    value: {
      required: false,
      defaultValue: false,
    },
    option: {
      required: false,
      defaultValue: null,
    },
    label: {
      control: { type: "text" },
      required: true,
      defaultValue: null,
    },
    hideLabel: {
      control: { type: "boolean" },
      required: false,
      defaultValue: false,
    },
    size: {
      control: { type: "select" },
      required: false,
      defaultValue: "medium",
      options: ["small", "medium", "large"],
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { OcCheckbox },
  data() {
    return {
      args: { onClick: { action: "clicked" }, ...args },
    }
  },
  template: `<oc-checkbox @click="action" v-bind="$props" />`,
  // TODO: Click handler is not firing
  methods: { action: action("clicked") },
})

export const Component = Template.bind({})
Component.args = {
  label: "Checkbox",
}
