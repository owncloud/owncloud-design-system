import { action } from "@storybook/addon-actions"
import OcAccordionItem from "./OcAccordionItem.vue"

export default {
  component: OcAccordionItem,
  title: "Molecules/AccordionItem",
  parameters: {
    controls: { sort: "alpha" },
  },
  argTypes: {
    description: {
      control: { type: "text" },
      defaultValue: "",
    },
    headingLevel: {
      control: { type: "text" },
      defaultValue: "3",
    },
    icon: {
      control: { type: "text" },
      defaultValue: null,
    },
    title: {
      control: { type: "text" },
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { OcAccordionItem },
  data() {
    return {
      args: { onClick: { action: "toggleExpanded" }, ...args },
    }
  },
  template: `
    <oc-accordion-item v-bind="$props" @click="action" title="${args.title}">
      <p>Example content</p>
    </oc-accordion-item>
  `,
  methods: { action: action("toggleExpanded") },
})

export const Component = Template.bind({})
Component.args = {
  title: "Example title",
}
