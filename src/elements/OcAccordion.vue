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
  computed: {
    accordionOptions() {
      return "multiple: " + this.multiple
    },
  },
  mounted() {
    this.$on("toggle", id => {
      const collapseOthers = !this.multiple
      this.$el.children.forEach(child => {
        const toggled = child.attributes.id.nodeValue === id
        console.log(child)
      })
    })
  }
}
</script>
<docs>
```jsx
<oc-accordion :multiple=false>
  <oc-accordion-item title="My accordion item">
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
