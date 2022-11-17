<template>
  <li ref="observerTarget" tabindex="-1">
    <slot />
  </li>
</template>
<script>
import { customRef, computed, ref, unref } from "vue"
import { useIsVisible } from "../../../composables"

export default {
  name: "OcSingeTile",
  status: "ready",
  release: "1.0.0",
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
