<template>
  <!-- eslint-disable vue/no-v-html -->
  <component
    :is="type"
    :class="[
      { 'oc-button-reset': type === 'button' },
      'oc-icon',
      sizeClass(size),
      variationClass(variation),
    ]"
    @click="onClick"
  >
    <inline-svg
      :src="name"
      :transform-source="transformSvgElement"
      :aria-hidden="accessibleLabel === '' ? 'true' : null"
      :aria-labelledby="accessibleLabel === '' ? null : svgTitleId"
      :focusable="accessibleLabel === '' ? 'false' : null"
    ></inline-svg>
  </component>
</template>

<script>
import uniqueId from "../utils/uniqueId"
import InlineSvg from "vue-inline-svg"
import { getSizeClass } from "../utils/sizeClasses"
/**
 * Icons are used to visually communicate core parts of the product and
 * available actions. They can act as wayfinding tools to help users more
 * easily understand where they are in the product.
 *
 * ## Accessibility
 * You can pass a label to the icon via the `accessibleLabel` property. The component will automatically add a `title` element which is also referenced by its ID via `aria-labelledby`.
 *
 * Omit `accessibleLabel` if your icon has a decorative purpose only. In this case the component will:
 *  1. set `aria-hidden` to `true`.
 *  2. set `focusable` to `false`.
 *  3. remove or empty all aria-related properties such as labels.
 */

/**
 * InlineSvg by default expects the src to be a url, because we inline the SVG's this won't work.
 * the download patch takes care of this by overwriting the native functionality and makes it compatible
 */
InlineSvg.name = "inline-svg"
InlineSvg.methods.download = name => {
  return (promise => {
    if (promise.isPending) return promise
    let isPending = true
    let result = promise.then(
      v => {
        isPending = false
        return v
      },
      e => {
        isPending = false
        throw e
      }
    )

    result.isPending = function getIsPending() {
      return isPending
    }
    return result
  })(
    new Promise((resolve, reject) => {
      let svg
      try {
        svg = require("../assets/icons/" + name + ".svg")
      } catch (e) {
        return reject(e)
      }
      resolve(new DOMParser().parseFromString(svg, "image/svg+xml").documentElement)
    })
  )
}

export default {
  name: "OcIcon",
  status: "ready",
  release: "1.0.0",
  components: {
    InlineSvg,
  },
  props: {
    /**
     * The name of the icon to display.
     */
    name: {
      type: String,
      default: "info",
    },
    /**
     * Descriptive text to be read to screenreaders.
     */
    accessibleLabel: {
      type: String,
      default: "",
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
     * Defaults to `passive`.
     * Can be `passive, primary, danger, success, warning or inverse`.
     * Inverse is meant to be used for icons on a colorful background.
     */
    variation: {
      type: String,
      default: "passive",
      validator: value => {
        return value.match(/(passive|primary|danger|success|warning|inverse)/)
      },
    },
  },
  computed: {
    svgTitleId() {
      return uniqueId("oc-icon-title-")
    },
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
    onClick() {
      this.$emit("click")
    },
    transformSvgElement(svg) {
      if (this.accessibleLabel !== "") {
        let title = document.createElement("title")
        title.setAttribute("id", this.svgTitleId)
        title.appendChild(document.createTextNode(this.accessibleLabel))
        svg.insertBefore(title, svg.firstChild)
      }

      return svg
    },
  },
}
</script>

<docs>
```js
<template>
  <section>
    <h3 class="oc-heading-divider">
      Default icons
    </h3>
    <oc-icon name="close" accessible-label="Close"/>
    <oc-icon name="delete" accessible-label="Delete"/>
    <oc-icon name="info" accessible-label="Information"/>
    <oc-icon name="account_circle" accessible-label="Account"/>

    <h3 class="oc-heading-divider">
      Hover over the icons to see the effect of accessible labels
    </h3>
    <oc-icon size="large" name="account_circle" accessible-label="Account"/>
    <oc-icon size="large" name="account_circle"/>

    <h3 class="oc-heading-divider">
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
          <oc-td v-bind:class="{'uk-background-primary': variation.name == 'inverse'}">
            <oc-icon :variation="variation.name" name="close"/>
            <oc-icon :variation="variation.name" name="delete"/>
            <oc-icon :variation="variation.name" name="info"/>
            <oc-icon :variation="variation.name" name="account_circle"/>
          </oc-td>
        </oc-tr>
      </oc-tbody>
    </oc-table-simple>

    <h3 class="oc-heading-divider">
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

  </section>
</template>
<script>
  export default {
    computed: {
      variations() {
        return [{
          id: "9828-4946-1277-7396",
          name: "passive",
        }, {
          id: "7828-3285-4787-2127",
          name: "primary",
        }, {
          id: "8376-8902-1172-2699",
          name: "danger",
        }, {
          id: "4935-2899-4697-2615",
          name: "success",
        }, {
          id: "2769-7633-8478-1257",
          name: "warning",
        }, {
          id: "2324-8956-9042",
          name: "inverse",
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
