<template>
  <component :is="type" :class="cellClasses">
    <slot />
  </component>
</template>
<script>
export default {
  name: "OcTableCell",
  status: "review",
  release: "1.0.0",
  props: {
    type: {
      type: String,
      default: "td",
      required: false,
      validator: type => /(td|th)/.test(type),
    },
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
  computed: {
    cellClasses() {
      return [
        "oc-table-cell",
        `oc-table-cell-align-${this.alignH}`,
        `oc-table-cell-align-${this.alignV}`,
        `oc-table-cell-width-${this.width}`,
      ]
    },
  },
}
</script>
<style lang="scss" scoped>
.oc-table-cell {
  /* padding is not configurable until we need it */
  padding: $space-xsmall;
  position: relative;

  &-align {
    &-left {
      text-align: left;
    }

    &-center {
      text-align: center;
    }

    &-right {
      text-align: right;
    }

    &-top {
      vertical-align: top;
    }

    &-middle {
      vertical-align: middle;
    }

    &-bottom {
      vertical-align: bottom;
    }
  }

  &-width {
    &-shrink {
      width: 1px;
    }

    &-expand {
      min-width: 150px;
    }
  }
}
</style>
