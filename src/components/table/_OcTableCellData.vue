<template>
  <oc-table-cell type="td" :align-h="alignH" :align-v="alignV" :width="width" class="oc-td">
    <slot />
  </oc-table-cell>
</template>
<script>
import OcTableCell from "./_OcTableCell"

export default {
  name: "OcTd",
  status: "review",
  release: "2.1.0",
  components: { OcTableCell },
  props: {
    alignH: {
      type: String,
      default: "left",
      validator: alignment => /(left|center|right)/.test(alignment),
    },
    alignV: {
      type: String,
      default: "middle",
      validator: alignment => /(top|middle|bottom)/.test(alignment),
    },
    width: {
      type: String,
      default: "auto",
      validator: width => /(auto|shrink|expand)/.test(width),
    },
  },
}
</script>
<style lang="scss" scoped>
.oc-td {
  /* vertical-align is not configurable until we need it */
  vertical-align: middle;
}
</style>
