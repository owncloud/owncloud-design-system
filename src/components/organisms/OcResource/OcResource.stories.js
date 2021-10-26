import OcResource from "./OcResource.vue"

export default {
  component: OcResource,
  title: "Organisms/Resource",
  parameters: {
    controls: { sort: "alpha" },
  },
  argTypes: {},
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { OcResource },
  data() {
    return {
      args: {
        ...args,
      },
    }
  },
  template: `<oc-resource v-bind="$props" />`,
})

export const Component = Template.bind({})
Component.args = {
  resource: {
    name: "Documents",
    path: "/Documents",
    icon: "folder",
    indicators: [],
    type: "folder"
  }
}
