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
  ```jsx
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
  <div class="uk-grid-collapse uk-child-width-auto">
    <oc-table middle divider>
      <oc-table-row>
        <oc-table-cell shrink type="head">Variation</oc-table-cell>
        <oc-table-cell expand type="head" class="">Icons</oc-table-cell>
      </oc-table-row>
      <oc-table-row>
        <oc-table-cell shrink>inverted</oc-table-cell>
        <oc-table-cell expand class="uk-background-primary">
          <oc-icon variation="inverted" name="close"/>
          <oc-icon variation="inverted" name="delete"/>
          <oc-icon variation="inverted" name="info"/>
          <oc-icon variation="inverted" name="account_circle"/>
        </oc-table-cell>
      </oc-table-row>
      <oc-table-row v-for="variation in ['danger', 'success', 'warning', 'file-type', 'system', 'active', 'passive']" :key="variation">
        <oc-table-cell shrink>{{variation}}</oc-table-cell>
        <oc-table-cell expand>
          <oc-icon :variation="variation" name="close"/>
          <oc-icon :variation="variation" name="delete"/>
          <oc-icon :variation="variation" name="info"/>
          <oc-icon :variation="variation" name="account_circle"/>
        </oc-table-cell>
      </oc-table-row>
    </oc-table>
  </div>

  <h3 class="uk-heading-divider">
    Icon sizes
  </h3>
  <div class="uk-grid-collapse uk-child-width-auto uk-overflow-hidden">
    <oc-table middle divider>
      <oc-table-row>
        <oc-table-cell shrink type="head">Size</oc-table-cell>
        <oc-table-cell expand type="head" class="">Icons</oc-table-cell>
      </oc-table-row>
      <oc-table-row v-for="size in ['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge', 'xxxlarge']" :key="size">
        <oc-table-cell shrink>{{size}}</oc-table-cell>
        <oc-table-cell expand class="uk-text-nowrap">
          <oc-icon :size="size" name="close"/>
          <oc-icon :size="size" name="delete"/>
          <oc-icon :size="size" name="info"/>
          <oc-icon :size="size" name="account_circle"/>
        </oc-table-cell>
      </oc-table-row>
    </oc-table>
  </div>
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
  ```
</docs>
