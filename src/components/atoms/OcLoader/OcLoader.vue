<template>
  <div :class="['oc-loader', { 'oc-loader-flat': flat }]" :aria-label="ariaLabel" />
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

<style lang="scss">
.oc-loader {
  @extend .uk-progress;
  @extend .uk-position-relative;

  &-flat {
    border-radius: 0 !important;
    height: 5px !important;
  }

  &::after {
    @extend .uk-position-absolute;
    @extend .uk-display-block;

    background: var(--oc-color-text-muted);
    content: "";
    height: 100%;
    width: 0;

    animation: {
      duration: $spinner-duration;
      iteration-count: infinite;
      name: oc-loader;
    }
  }
}

@keyframes oc-loader {
  0% {
    left: 0;
    width: 0;
  }

  50% {
    left: 0;
    width: 66%;
  }

  100% {
    left: 100%;
    width: 10%;
  }
}
</style>

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
