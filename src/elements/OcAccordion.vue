<template>
  <ul class="oc-accordion">
    <!-- @slot Many oc-accordion-item elements  -->
    <slot />
  </ul>
</template>
<script>
export default {
  name: "oc-accordion",
  status: "review",
  release: "1.0.0",
  props: {
    /**
     * Allow multiple items to be expanded at the same time
     */
    multiple: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  mounted() {
    this.$on("toggle", id => this.$_ocAccordion_toggleItem(id))
    this.$_ocAccordion_init()
  },

  methods: {
    $_ocAccordion_toggleItem(id) {
      const collapseOthers = !this.multiple

      this.$children.forEach(child => {
        const toggled = child.$_ocAccordionItem_id === id

        if (toggled) {
          return child.$data.expanded = !child.$data.expanded
        }

        if (collapseOthers) {
          child.$data.expanded = false
        }
      })
    },

    $_ocAccordion_init() {
      if (!this.multiple) {
        let found = false

        this.$children.forEach(child => {
          if (!found && child.$props.expandedByDefault) {
            return found = true
          }

          if (found) {
            child.$data.expanded = false
          }
        })
      }
    }
  }
}
</script>
<docs>
An accordion is a vertically stacked set of interactive headings that each contain a title, content snippet, or thumbnail representing a section of content.
The headings function as controls that enable users to reveal or hide their associated sections of content.
Accordions are commonly used to reduce the need to scroll when presenting multiple sections of content on a single page.

The accordion component is using `oc-accordion-item` as its children.
To see documentation on how to use this component, see [oc-accordion-item](/#/Elements/oc-accordion-item).

```jsx
<oc-accordion :multiple=false class="uk-width-1-2">
  <oc-accordion-item :expandedByDefault=true title="My accordion item" icon="folder">
    <p>
      I am the content of this accordion
    </p>
  </oc-accordion-item>
  <oc-accordion-item title="Something else with content" description="And a subtitle" icon="file">
      <p>Enter some text!</p>
      <oc-text-input label="Text"></oc-text-input>
  </oc-accordion-item>
</oc-accordion>
```
</docs>
