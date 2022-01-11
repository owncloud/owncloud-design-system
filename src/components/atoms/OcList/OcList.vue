<template functional>
  <ul
    v-bind="data.attrs"
    :ref="data.ref"
    class="oc-list oc-my-rm oc-mx-rm"
    :class="[data.staticClass, data.class]"
  >
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
