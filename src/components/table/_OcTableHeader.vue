<template>
  <thead class="oc-thead">
    <slot />
  </thead>
</template>
<script>
export default {
  name: "oc-thead",
  status: "review",
  release: "2.1.0"
}
</script>
<style lang="scss" scoped>
.oc-thead {
  border-bottom: 1px solid $border-primary;
}
</style>
