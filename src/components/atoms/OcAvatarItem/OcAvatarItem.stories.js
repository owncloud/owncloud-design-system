import OcAvatarItem from "./OcAvatarItem.vue"

export default {
  component: OcAvatarItem,
  title: "Atoms/Avatar Item",
  // TODO: Sort props alphabetically or stick to custom order?
  parameters: { controls: { sort: "alpha" } },
  argTypes: {
    name: {
      control: { type: "text" },
      defaultValue: "",
      required: true,
    },
    icon: {
      control: { type: "text" },
      defaultValue: null,
      required: false,
    },
    iconColor: {
      control: { type: "text" },
      defaultValue: "var(--oc-color-text-inverse)",
      required: false,
    },
    background: {
      control: { type: "text" },
      defaultValue: "var(--oc-color-swatch-brand-default)",
      required: false,
    },
    accessibleLabel: {
      control: { type: "text" },
      defaultValue: "",
      required: false,
    },
    width: {
      control: { type: "number" },
      defaultValue: 30,
      required: false,
    },
    iconSize: {
      control: { type: "text" },
      defaultValue: "small",
      required: false,
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { OcAvatarItem },
  template: `<oc-avatar-item v-bind="$props" />`,
})

export const Component = Template.bind({})
Component.args = {
  name: "Name",
}
