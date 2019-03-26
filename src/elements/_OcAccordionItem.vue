<template>
  <li>
    <a class="uk-accordion-title" href="#">
      {{ title }}
      <span v-if="subtitle !== undefined" class="uk-text-meta uk-margin-left">{{ subtitle }}</span>
    </a>
    <div class="uk-accordion-content">
      <slot name="content">Content of them item is here</slot>
    </div>
  </li>
</template>
<script>
export default {
  name: "oc-accordion-item",
  status: "review",
  release: "1.0.0",
  props: {
    /**
     * The title of the item shown in the list
     */
    title: {
      type: String,
      required: true,
    },
    /**
     * Subtitle shown after the main title, in the accordion list
     */
    subtitle: {
      type: String,
      required: false,
    },
  },
}
</script>
<docs>
```jsx
<oc-accordion>
  <oc-accordion-item title="Public link share">
    <template slot="content">
      <p>Hey, I can be expanded</p>
    </template>
  </oc-accordion-item>
</oc-accordion>
```
</docs>
