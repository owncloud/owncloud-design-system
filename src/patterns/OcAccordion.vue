<template>
  <ul :uk-accordion="accordionOptions">
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
}
</script>
<docs>
```jsx
<oc-accordion :multiple=false>
  <oc-accordion-item>
    <template slot="title">
      My accordion item
    </template>
    <p slot="content">
      I am the content of this accordion
    </p>
  </oc-accordion-item>
  <oc-accordion-item>
    <template slot="title">
      Something else with content
    </template>
    <template slot="subtitle">
      And a subtitle
    </template>
    <template slot="content">
      <p>Enter some text!</p>
      <oc-text-input></oc-text-input>
    </template>
  </oc-accordion-item>
</oc-accordion>
```
</docs>
