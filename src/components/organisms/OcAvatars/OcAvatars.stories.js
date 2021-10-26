import OcAvatars from "./OcAvatars.vue"
import { shareType } from "../../../utils/shareType.js"

export default {
  component: OcAvatars,
  title: "Organisms/Avatars",
  parameters: {
    controls: { sort: "alpha" },
  },
  argTypes: {},
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { OcAvatars },
  data() {
    return {
      args: {
        ...args,
      },
    }
  },
  template: `<oc-avatars v-bind="$props" />`,
})

export const Component = Template.bind({})
Component.args = {
  items: [
    {
      name: "bob",
      shareType: shareType.remote,
    },
    {
      username: "marie",
      displayName: "Marie",
      shareType: shareType.user,
    },
    {
      username: "peter",
      displayName: "Peter",
      avatar:
        "https://images.unsplash.com/photo-1610216705422-caa3fcb6d158?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHwyfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      shareType: shareType.user,
    },
    {
      username: "udo",
      displayName: "Udo",
      avatar:
        "https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mzh8fGZhY2V8ZW58MHwyfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      shareType: shareType.user,
    },
    {
      name: "john",
      shareType: shareType.guest,
    },
    {
      name: "Public link",
      shareType: shareType.link,
    },
    {
      name: "Test",
      shareType: shareType.group,
    },
  ],
}
