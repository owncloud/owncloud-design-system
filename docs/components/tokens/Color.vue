<template>
  <ul class="color colors-list">
    <li v-for="(prop, index) in tokens" :key="index" class="oc-mx-s oc-mb-m" :class="prop.category">
      <div class="oc-py-l oc-px-l" :style="{ backgroundColor: prop.value }" />
      <h4 class="oc-my-s">{{ prop.name }}</h4>
      <ul>
        <li v-for="(v, k) in prop.info" :key="k">
          <em>{{ k }}:</em> {{ v }}
        </li>
        <li><em>scss:</em> ${{ prop.name }}</li>
        <li><em>css:</em> var(--{{ prop.name }})</li>
      </ul>
    </li>
  </ul>
</template>

<script>
import designTokens from "../../../src/assets/tokens/ods.json"

export default {
  name: "Color",
  computed: {
    tokens() {
      return Object.values(designTokens).filter(token => token.name.startsWith("oc-color-"))
    },
  },
}
</script>

<style lang="scss">
.colors-list {
  list-style: none;
  > li {
    display: inline-block;
    vertical-align: top;
    width: 250px;
    div {
      border: 1px solid black;
    }
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }
  }
}
</style>
