<template>
  <table>
    <thead>
      <tr>
        <th>Token Name</th>
        <th>Value</th>
        <th>Category</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(token, index) in tokens" :key="index" class="token">
        <td v-if="token.name">
          <code class="name">${{ token.name.replace(/_/g, "-") }}</code>
        </td>
        <td v-else>N/A</td>
        <td v-if="token.value">
          <div v-if="token.name.startsWith('oc-color')" :style="{ backgroundColor: token.value }" />
          <code class="color">{{ token.value }} </code>
        </td>
        <td v-else>N/A</td>
        <td v-if="token.category">
          {{ token.category }}
        </td>
        <td v-else>N/A</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import designTokens from "../../../src/assets/tokens/ods.json"

export default {
  name: "All",
  data() {
    return {
      tokens: Object.values(designTokens),
    }
  },
}
</script>
