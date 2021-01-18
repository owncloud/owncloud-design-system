<template>
  <div>
    <div v-for="(filename, index) in icons" :key="index">
      <oc-icon :name="filename" size="large"></oc-icon>
      <oc-icon :name="filename" size="large" variation="file-type"></oc-icon>
      <oc-icon :name="filename" size="large" variation="success"></oc-icon>
      <oc-icon :name="filename" size="large" variation="warning"></oc-icon>
      <oc-icon :name="filename" size="large" variation="danger"></oc-icon>
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
