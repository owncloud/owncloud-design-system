<template>
  <ul>
    <li v-for="(prop, index) in tokens" :key="index" class="font" :style="{ fontSize: prop.value }">
      ${{ prop.name }}, var(--{{ prop.name }})
      <span>({{ prop.value }})</span>
    </li>
  </ul>
</template>

<script>
import designTokens from "../../../src/assets/tokens/ods.json"

export default {
  name: "FontSize",
  computed: {
    tokens() {
      return Object.values(designTokens).filter(token => token.name.startsWith("oc-font-size-"))
    },
  },
}
</script>
