<template>
  <div :class="$_ocGrid_class" uk-grid>
    <slot />
  </div>
</template>

<script>
/**
 * The Grid system allows you to arrange block elements in columns.
 */
export default {
  name: "oc-grid",
  status: "prototype",
  release: "1.0.0",
  props: {
    /**
     * The Grid component comes with a default gutter that is decreased automatically from a certain breakpoint usually on a smaller desktop viewport width. To apply a different gutter, add one of the following: small, medium, large
     */
    gutter: {
      type: String,
      default: "collapse",
      validator: value => {
        return value.match(/(small|medium|large|collapse)/)
      },
    },
    /**
     * Match the height of the direct child of each cell
     */
    match: {
      type: Boolean,
      default: false,
    },
    /**
     * If the grid columns are evenly split, you can add the values here instead of adding it to each of the items.
     * Works with all available sizes described in https://getuikit.com/docs/width but **drop the "uk-width-" prefix!**
     */
    childWidth: {
      type: [String, Array, Boolean],
      default: false,
    },
  },
  computed: {
    $_ocGrid_class() {
      let c = []

      c.push("uk-grid-" + this.gutter)

      if (this.match) c.push("uk-grid-match")

      if (this.childWidth && typeof this.childWidth === "object")
        c = c.concat(this.childWidth.map(e => "uk-child-width-" + e))
      else if (this.childWidth && typeof this.childWidth === "string")
        c.push("uk-child-width-" + this.childWidth)

      return c
    },
  },
}
</script>
<docs>
```jsx
  <h3 class="uk-heading-divider">
    Simple boxes
  </h3>
  <oc-grid childWidth="expand">
    <div>
      <div class="uk-background-muted uk-height-small"></div>
    </div>
    <div>
      <div class="uk-background-primary uk-height-small"></div>
    </div>
    <div>
      <div class="uk-background-secondary uk-height-small"></div>
    </div>
  </oc-grid>

  <h3 class="uk-heading-divider">
    Simple boxes
  </h3>
  <oc-grid gutter="large" match>
    <div class="uk-width-1-1 uk-width-large@l">
      <div class="uk-background-muted uk-padding">
        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
      </div>
    </div>
    <div class="uk-width-expand">
      <div class="uk-background-secondary uk-padding">
        <p>I'm matching my neightbors height in @l viewports</p>
      </div>
    </div>
  </oc-grid>
```
</docs>
