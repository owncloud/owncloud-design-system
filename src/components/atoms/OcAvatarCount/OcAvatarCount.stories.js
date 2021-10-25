import OcAvatarCount from "./OcAvatarCount.vue"

export default {
  component: OcAvatarCount,
  title: "Atoms/AvatarCount",
  argTypes: {
    count: {
      control: { type: "number" },
      required: true,
    },
    size: {
      control: { type: "number" },
      required: false,
      defaultValue: 30,
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { OcAvatarCount },
  template: `<oc-avatar-count v-bind="$props" />`,
})

export const Component = Template.bind({})
Component.args = {
  count: 42,
}
