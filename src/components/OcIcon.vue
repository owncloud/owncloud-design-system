<template>
  <!-- eslint-disable vue/no-v-html -->
  <component
    :is="$_ocIcon_type"
    v-if="iconNotLoaded"
    :aria-label="ariaLabel"
    :class="[
      { 'oc-button-reset': type === 'button' },
      'oc-icon',
      sizeClass(size),
      variationClass(variation),
    ]"
    @click="$_ocIcon_click"
    v-html="$_ocIcon_svg"
  />
  <!-- eslint-enable vue/no-v-html -->
  <img
    v-else
    :src="iconUrl"
    :aria-label="ariaLabel"
    :class="[
      { 'oc-button-reset': type === 'button' },
      'oc-icon',
      sizeClass(size),
      variationClass(variation),
    ]"
    @click="$_ocIcon_click"
  />
</template>

<script>
const req = require.context("../assets/icons/", true, /^\.\/.*\.svg$/)
import { getSizeClass } from "../utils/sizeClasses"
/**
 * Icons are used to visually communicate core parts of the product and
 * available actions. They can act as wayfinding tools to help users more
 * easily understand where they are in the product.
 */
export default {
  name: "OcIcon",
  status: "review",
  release: "1.0.0",
  props: {
    /**
     * The name of the icon to display.
     */
    name: {
      type: String,
      default: "info",
    },
    /**
     * Alternative way to specify the svg icon via an url.
     * In case no image can be loaded from ths give url the icon
     * as defined by the name property will be displayed.
     */
    url: {
      type: String,
      required: false,
      default: null,
    },
    /**
     * Descriptive text to be read to screenreaders.
     */
    ariaLabel: {
      type: String,
      default: "icon",
    },
    /**
     * The html element name used for the icon.
     */
    type: {
      type: String,
      default: "span",
    },
    /**
     * The size of the icon. Defaults to small.
     * `xsmall, small, medium, large, xlarge, xxlarge`
     */
    size: {
      type: String,
      default: "medium",
      validator: value => {
        return value.match(/(xsmall|small|medium|large|xlarge|xxlarge|xxxlarge)/)
      },
    },
    /**
     * Style variation to give additional meaning.
     * `inverted, danger, success, warning`
     */
    variation: {
      type: String,
      default: "system",
      validator: value => {
        return value.match(/(file-type|system|active|passive|inverted|danger|success|warning)/)
      },
    },
  },
  data() {
    return {
      iconUrl: undefined,
      iconNotLoaded: true,
    }
  },
  computed: {
    $_ocIcon_type() {
      return this.type
    },
    $_ocIcon_svg() {
      return req("./" + this.name + ".svg")
    },
  },
  watch: {
    url() {
      this.loadImage()
    },
  },
  mounted() {
    this.loadImage()
  },
  methods: {
    sizeClass(c) {
      return this.prefix(getSizeClass(c))
    },
    variationClass(c) {
      return this.prefix(c)
    },
    prefix(string) {
      if (string !== null) return `oc-icon-${string}`
    },
    $_ocIcon_click() {
      this.$emit("click")
    },
    loadImage() {
      this.iconUrl = this.url
      if (this.url !== "") {
        const img = new Image()
        img.addEventListener("load", () => {
          this.iconNotLoaded = false
        })
        img.addEventListener("error", () => {
          this.$emit("error")
          this.iconUrl = ""
        })
        img.src = this.iconUrl
      }
    },
  },
}
</script>

<docs>
```
<template>
  <section>
    <h3 class="uk-heading-divider">
      Default icons
    </h3>
    <oc-icon name="close" aria-label="Close"/>
    <oc-icon name="delete" aria-label="Delete"/>
    <oc-icon name="info" aria-label="Information"/>
    <oc-icon name="account_circle" aria-label="My Account"/>

    <h3 class="uk-heading-divider">
      Icon color variations
    </h3>
    <oc-table-simple :hover="true">
      <oc-thead>
        <oc-tr>
          <oc-th>Variation</oc-th>
          <oc-th>Icons</oc-th>
        </oc-tr>
      </oc-thead>
      <oc-tbody>
        <oc-tr v-for="variation in variations" :key="'variation-' + variation.id">
          <oc-td>{{ variation.name }}</oc-td>
          <oc-td v-bind:class="{'uk-background-primary': variation.name == 'inverted'}">
            <oc-icon :variation="variation.name" name="close"/>
            <oc-icon :variation="variation.name" name="delete"/>
            <oc-icon :variation="variation.name" name="info"/>
            <oc-icon :variation="variation.name" name="account_circle"/>
          </oc-td>
        </oc-tr>
      </oc-tbody>
    </oc-table-simple>

    <h3 class="uk-heading-divider">
      Icon sizes
    </h3>
    <oc-table-simple :hover="true">
      <oc-thead>
        <oc-tr>
          <oc-th>Size</oc-th>
          <oc-th>Icons</oc-th>
        </oc-tr>
      </oc-thead>
      <oc-tbody>
        <oc-tr v-for="size in sizes" :key="size.name">
          <oc-td>{{ size.name }}</oc-td>
          <oc-td>
            <oc-icon :size="size.name" name="close"/>
            <oc-icon :size="size.name" name="delete"/>
            <oc-icon :size="size.name" name="info"/>
            <oc-icon :size="size.name" name="account_circle"/>
          </oc-td>
        </oc-tr>
      </oc-tbody>
    </oc-table-simple>

    <h3 class="uk-heading-divider">
      Icons loaded via URL
    </h3>
    <div class="oc-m">
      <oc-icon size="medium" url="https://interactive-examples.mdn.mozilla.net/media/examples/firefox-logo.svg"/>
      <oc-icon size="large" url="https://interactive-examples.mdn.mozilla.net/media/examples/firefox-logo.svg"/>
      <oc-icon size="large" name="account_circle" url="https://interactive-examples.mdn.mozilla.net/media/examples/firefox-logo.sv"/>
      <oc-icon size="large" url="https://interactive-examples.mdn.mozilla.net/media/examples/firefox-logo.s"/>
    </div>
  </section>
</template>
<script>
export default {
  computed: {
    variations() {
      return [{
        id: "1857-7432-9675-5145",
        name: "file-type",
      }, {
        id: "9828-4946-1277-7396",
        name: "system",
      }, {
        id: "7828-3285-4787-2127",
        name: "active",
      }, {
        id: "2971-4568-2460-9940",
        name: "passive",
      }, {
        id: "6649-3907-5985-2695",
        name: "inverted",
      }, {
        id: "8376-8902-1172-2699",
        name: "danger",
      }, {
        id: "4935-2899-4697-2615",
        name: "success",
      }, {
        id: "2769-7633-8478-1257",
        name: "warning",
      }]
    },
    sizes() {
      return [{
        id: "6343-1519-1328-9822",
        name: "xsmall",
      }, {
        id: "9041-7650-9126-4291",
        name: "small",
      }, {
        id: "9665-6662-8676-4866",
        name: "medium",
      }, {
        id: "9130-7140-3870-5438",
        name: "large",
      }, {
        id: "5022-6406-9625-7093",
        name: "xlarge",
      }, {
        id: "9337-2657-4486-1014",
        name: "xxlarge",
      }, {
        id: "8234-4209-7553-9253",
        name: "xxxlarge",
      }]
    },
  },
}
</script>
  ```
</docs>
