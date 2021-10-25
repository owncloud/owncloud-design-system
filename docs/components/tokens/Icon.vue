<template>
  <ul class="uk-list">
    <li
      v-for="(filename, index) in icons"
      :key="index"
      class="uk-flex uk-flex-between uk-flex-middle uk-width-1-1"
    >
      <p class="oc-mb-rm">{{ filename }}:</p>
      <div>
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
      </div>
    </li>
  </ul>
</template>

<script>
import OcIcon from "../../../src/components/atoms/OcIcon/OcIcon.vue"
const req = require.context("../../../src/assets/icons/", true, /^\.\/.*\.svg$/)

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
