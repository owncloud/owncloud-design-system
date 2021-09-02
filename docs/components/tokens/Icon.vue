<template>
  <div>
    <div v-for="(filename, index) in icons" :key="index">
      <oc-icon :name="filename" size="large" variation="passive" />
      <oc-icon :name="filename" size="large" variation="primary" />
      <oc-icon :name="filename" size="large" variation="success" />
      <oc-icon :name="filename" size="large" variation="warning" />
      <oc-icon :name="filename" size="large" variation="danger" />
      <span
        style="background-color: var(--oc-color-swatch-brand-default); display: inline-block"
        class="oc-icon-l"
      >
        <oc-icon :name="filename" size="large" variation="inverse" />
      </span>
      <span>{{ filename }}</span>
    </div>
  </div>
</template>

<script>
import OcIcon from "../../../src/components/OcIcon"
const req = require.context("@/assets/icons/", true, /^\.\/.*\.svg$/)

/**
 * All known icons in ownCloud Design System
 */
export default {
  name: "Icon",
  components: { OcIcon },
  data() {
    return {
      icons: req.keys().map(filename => {
        return filename.split(".").slice(0, -1).join(".").substring(2)
      }),
    }
  },
}
</script>

<docs>
  ```
  <Icon/>
  ```
</docs>
