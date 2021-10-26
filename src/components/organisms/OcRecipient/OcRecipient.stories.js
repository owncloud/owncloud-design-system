import OcRecipient from "./OcRecipient.vue"

export default {
  component: OcRecipient,
  title: "Organisms/Recipient",
  parameters: {
    controls: { sort: "alpha" },
  },
  argTypes: {},
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { OcRecipient },
  data() {
    return {
      args: {
        ...args,
      },
    }
  },
  template: `<oc-recipient v-bind="$props" />`,
})

export const Component = Template.bind({})
Component.args = {
  recipient: {
    name: "Alice",
    avatar: "https://picsum.photos/24",
    hasAvatar: true,
    isAvatarLoading: false,
  }
}
