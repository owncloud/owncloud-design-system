<template functional>
  <ul
    v-bind="data.attrs"
    :ref="data.ref"
    class="oc-list oc-my-rm oc-mx-rm"
    :class="[data.staticClass, data.class, { 'oc-list-raw': props.raw }]"
  >
    <slot />
  </ul>
</template>

<script>
export default {
  name: "OcList",
  status: "ready",
  released: "unreleased",
  props: { 
    raw: {
      type: Boolean,
      default: false,
      required: false
    },
  }
}
</script>

<style lang="scss">
.oc-list {
  list-style: none;
  margin: 0;
  padding: 0;

  &-divider > :nth-child(n+2) {
    border-top: 1px solid var(--oc-color-border);
    margin-top: var(--oc-space-small);
    padding-top: var(--oc-space-small);
  }
  
}
.oc-list-raw {
  list-style-type: none;
  a {
    text-decoration: none !important;
    &:hover {
      color: inherit;
    }
  }
}
</style>
