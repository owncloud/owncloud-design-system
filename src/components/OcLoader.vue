<template>
  <div :class="['oc-loader', { 'oc-loader-flat': flat }]" :aria-label="ariaLabel"></div>
</template>

<script>
/**
 * Remote actions can take an undefined portion of time. The spinner gives feedback to the users about an actions being processed.
 */
export default {
  name: "OcLoader",
  status: "ready",
  release: "1.0.0",
  props: {
    /**
     * Descriptive text to be read to screen-readers.
     */
    ariaLabel: {
      type: String,
      default: "Loading",
    },
    /**
     * Removes border radius and shrinks the height. Defaults to false.
     */
    flat: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<docs>
```js
<h3 class="oc-heading-divider">
  Default style
</h3>
<div>
  <oc-loader />
</div>

<h3 class="oc-heading-divider">
  Flat style
</h3>
<div>
  <oc-loader :flat="true" />
</div>
```
</docs>
