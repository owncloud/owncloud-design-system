<template>
  <div>
    <div v-for="(filename, index) in icons" :key="index">
      <oc-icon :name="filename" fill-type="none" size="large" variation="passive" />
      <oc-icon :name="filename" fill-type="none" size="large" variation="primary" />
      <oc-icon :name="filename" fill-type="none" size="large" variation="success" />
      <oc-icon :name="filename" fill-type="none" size="large" variation="warning" />
      <oc-icon :name="filename" fill-type="none" size="large" variation="danger" />
      <span
        style="background-color: var(--oc-color-swatch-brand-default); display: inline-block"
        class="oc-icon-l"
      >
        <oc-icon :name="filename" fill-type="none" size="large" variation="inverse" />
      </span>
      <span>{{ filename }}</span>
    </div>
  </div>
</template>

<script>
import OcIcon from "../../../src/components/atoms/OcIcon/OcIcon.vue"
const req = require.context("../../../src/assets/icons/", true, /^\.\/.*\.svg$/)

/**
 * All known icons in ownCloud Design System
 * <p>
 *  Icons made by <a href="https://remixicon.com/">Remixicon</a> and, in the case of the `resource-type-*` icons, <a href="https://fontawesome.com/">Font Awesome</a> (available under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/) license).
 * </p>
 */
export default {
  name: "IconList",
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
  <icon-list />
  ```
</docs>
