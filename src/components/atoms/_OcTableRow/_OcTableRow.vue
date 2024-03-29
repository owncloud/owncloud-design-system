<template>
  <tr ref="observerTarget" tabindex="-1">
    <oc-td v-if="isHidden" :colspan="lazyColspan">
      <span class="shimmer" />
    </oc-td>
    <slot v-else />
  </tr>
</template>
<script>
import { customRef, computed, ref, unref } from "@vue/composition-api"
import { useIsVisible } from "../../../composables"
import OcTd from "../_OcTableCellData/_OcTableCellData.vue"

export default {
  name: "OcTr",
  status: "ready",
  release: "1.0.0",
  components: { OcTd },
  props: {
    lazy: {
      type: Object,
      required: false,
      default: null,
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
          $el = value
          trigger()
        },
      }
    })

    const lazyColspan = ref(null)
    if (props.lazy) {
      lazyColspan.value = props.lazy.colspan
    }

    const { isVisible } = props.lazy
      ? useIsVisible({
          ...props.lazy,
          target: observerTarget,
        })
      : { isVisible: ref(true) }

    const isHidden = computed(() => !unref(isVisible))

    return {
      observerTarget,
      isHidden,
      lazyColspan,
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
