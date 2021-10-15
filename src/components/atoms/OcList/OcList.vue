<template functional>
  <ul v-bind="data.attrs" :ref="data.ref" class="oc-list" :class="[data.staticClass, data.class]">
    <slot />
  </ul>
</template>

<script>
export default {
  name: "OcList",
  status: "ready",
  released: "unreleased",
}
</script>

<style lang="scss">
.oc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
