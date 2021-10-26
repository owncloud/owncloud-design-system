import OcAccordion from "./OcAccordion.vue"
import OcAccordionItem from "../../molecules/OcAccordionItem/OcAccordionItem.vue"

export default {
  component: OcAccordion,
  title: "Organisms/Accordion",
  parameters: {
    controls: { sort: "alpha" },
  },
  argTypes: {
    expandFirst: {
      control: { type: "boolean" },
      defaultValue: false,
    },
    multiple: {
      control: { type: "boolean" },
      defaultValue: false,
    },
    mode: {
      control: { type: "select" },
      defaultValue: "click",
      options: ["click", "data"],
    },
    expandedId: {
      control: { type: "text" },
      defaultValue: "one",
    },
    expandedIds: {
      control: { type: "object" },
      defaultValue: null, // can be set to e.g. ["one", "two"]
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { OcAccordion, OcAccordionItem },
  template: `
    <oc-accordion v-bind="$props">
      <oc-accordion-item id="one" title="My accordion item" icon="folder">
        <p>
          I am the content of this accordion
        </p>
      </oc-accordion-item>
      <oc-accordion-item id="two" title="Something else with content" description="And a subtitle" icon="file">
        <p>
          I am the content of this accordion
        </p>
      </oc-accordion-item>
    </oc-accordion>
  `,
})

export const Component = Template.bind({})
