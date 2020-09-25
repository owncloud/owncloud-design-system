<template>
  <li>
    <a class="uk-accordion-title" href="#">
      <slot name="title" />
      <span v-if="$slots.subtitle" class="uk-text-meta oc-ml">
        <slot name="subtitle" />
      </span>
    </a>
    <div class="uk-accordion-content">
      <slot name="content" />
    </div>
  </li>
</template>
<script>
export default {
  name: "oc-accordion-item",
  status: "review",
  release: "1.0.0",
}
</script>
<docs>
```jsx
<oc-accordion>
  <oc-accordion-item>
    <div slot="title">
      Public link share
    </div>
    <div slot="content">
      <p>Hey, I can be expanded</p>
    </div>
  </oc-accordion-item>
</oc-accordion>
```
</docs>
