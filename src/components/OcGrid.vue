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
  name: "OcGrid",
  status: "ready",
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
     * Center elements along the cross axis.
     */
    flex: {
      type: [Boolean],
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

      if (this.match) {
        c.push("uk-grid-match")
      }

      if (this.flex) {
        c.push("uk-flex")
        c.push("uk-flex-middle")
      }

      if (this.childWidth && typeof this.childWidth === "object") {
        c = c.concat(this.childWidth.map(e => "uk-child-width-" + e))
      } else if (this.childWidth && typeof this.childWidth === "string") {
        c.push("uk-child-width-" + this.childWidth)
      }

      return c
    },
  },
}
</script>
<docs>
```js
  <h3 class="oc-heading-divider">
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

  <h3 class="oc-heading-divider">
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

  <h3 class="oc-heading-divider">
    An application bar
  </h3>

<div class="uk-background-muted uk-padding-small">
  <oc-grid flex gutter="small">
    <div class="uk-width-expand">
      <oc-breadcrumb :items="[{text:'First',to:{path:'first'}},{text:'Second'},{text:'Third'}]"></oc-breadcrumb>
    </div>
    <div class="uk-width-auto uk-visible@m">
      <oc-search-bar />
    </div>
    <div class="uk-width-auto">
      <div class="uk-button-group">
        <oc-button text="Nothing">Nothing</oc-button>
        <oc-button id="my_drop_1"><oc-icon name="filter_list" /></oc-button>
      </div>
    </div>
  </oc-grid>
  <oc-drop toggle="#my_drop_1" mode="hover">
    <div slot="special" class="uk-card uk-card-default">
      <div class="uk-card-header">
        <h3 class="uk-card-title">
          Advanced
        </h3>
      </div>
      <div class="uk-card-body">
        <p>
          I'm a slightly more advanced drop down
        </p>
        <oc-search-bar small class="uk-hidden@m" />
      </div>
    </div>
  </oc-drop>
</div>
```
</docs>
