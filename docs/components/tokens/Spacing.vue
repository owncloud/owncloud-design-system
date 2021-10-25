<template>
  <ul>
    <li
      v-for="(prop, index) in tokens"
      :key="index"
      class="space"
      :style="{ lineHeight: prop.value, height: prop.value }"
    >
      ${{ prop.name.replace(/_/g, "-") }}
      <span>({{ prop.value }})</span>
    </li>
  </ul>
</template>

<script>
import designTokens from "../../../src/assets/tokens/ods.json"

export default {
  name: "Spacing",
  computed: {
    tokens() {
      return Object.values(designTokens).filter(token => token.name.startsWith("oc-space"))
    },
  },
}
</script>
