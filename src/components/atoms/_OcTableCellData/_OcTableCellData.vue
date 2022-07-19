<template>
  <oc-table-cell
    ref="observerTarget"
    type="td"
    :align-h="alignH"
    :align-v="alignV"
    :width="width"
    :wrap="wrap"
    class="oc-td"
  >
    <slot v-if="isVisible" />
    <span v-else class="shimmer"></span>
  </oc-table-cell>
</template>
<script>
import OcTableCell from "../_OcTableCell/_OcTableCell.vue"
import { customRef, ref } from "@vue/composition-api"
import { useIsVisible } from "../../../composables"

export default {
  name: "OcTd",
  status: "ready",
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
    wrap: {
      type: String,
      default: null,
      validator: wrap => (wrap ? /(break|nowrap|truncate)/.test(wrap) : true),
    },
    lazy: {
      type: [Boolean, Object],
      default: false,
    },
  },
  setup(props) {
    const observerTarget = customRef((track, trigger) => {
      let $el
      return {
        get() {
          track()
          return $el
        },
        set(value) {
          $el = value.$el
          trigger()
        },
      }
    })

    const { isVisible } = props.lazy
      ? useIsVisible({
          ...(typeof props.lazy === "object" && props.lazy),
          target: observerTarget,
        })
      : { isVisible: ref(true) }

    return {
      observerTarget,
      isVisible,
    }
  },
}
</script>
<style lang="scss">
.shimmer {
  background-color: var(--oc-color-input-text-muted);
  bottom: 12px;
  display: inline-block;
  left: var(--oc-space-small);
  opacity: 0.2;
  overflow: hidden;
  position: absolute;
  right: var(--oc-space-small);
  top: 12px;

  &::after {
    animation: shimmer 2s infinite;
    background-image: linear-gradient(
      90deg,
      rgba(#fff, 0) 0,
      rgba(#fff, 0.2) 20%,
      rgba(#fff, 0.5) 60%,
      rgba(#fff, 0)
    );
    bottom: 0;
    content: "";
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    transform: translateX(-100%);
  }

  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }
}
</style>
