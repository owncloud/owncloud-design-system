<template>
  <ul class="oc-accordion">
    <!-- @slot Many oc-accordion-item elements  -->
    <slot />
  </ul>
</template>
<script>
/**
 * Creates a list with items that are expandable
 */
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
        const toggled = child.$_ocAccordionItem_ref === id

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
```jsx
<oc-accordion :multiple=false>
  <oc-accordion-item :expandedByDefault=true title="My accordion item">
    <p>
      I am the content of this accordion
    </p>
  </oc-accordion-item>
  <oc-accordion-item title="Something else with content" description="And a subtitle">
      <p>Enter some text!</p>
      <oc-text-input label="Text"></oc-text-input>
  </oc-accordion-item>
</oc-accordion>
```
</docs>
