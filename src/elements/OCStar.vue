<template>
  <div class="oc-star">
    <oc-icon v-show="shining" class="oc-star-shining" name="star" />
    <oc-icon v-show="!shining" class="oc-star-dimm" name="star_border" />
  </div>
</template>
<script>
/**
 * A star is used to mark a favorite element.
 *
 * It has basically two states: normal and shining.
 */
export default {
  name: "oc-star",
  status: "review",
  release: "1.0.0",
  props: {
    /**
     * Make the star shine ....
     **/
    shining: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
}
</script>
<docs>
```jsx
<div>
  <section>
    <h3 class="uk-heading-divider">
      Just a star
    </h3>
    <oc-star/>
    <h3 class="uk-heading-divider">
      A shining star
    </h3>
    <oc-star shining/>
  </section>
</div>
```
</docs>
