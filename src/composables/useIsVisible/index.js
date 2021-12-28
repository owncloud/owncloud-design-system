import { onBeforeUnmount, ref, watch } from "@vue/composition-api"

/**
 * once ODS has lodash this debounce implementation can be replaced with the one from lodash.
 * @param delay
 * @param callback
 * @returns {(function(...[*]=): void)|*}
 */
const debounce = (callback, delay = 0) => {
  let id = null
  return (...args) => {
    window.clearTimeout(id)
    id = window.setTimeout(() => {
      callback.apply(null, args)
    }, delay)
  }
}

/**
 *
 * @param {Ref<Element>} target - ref with element to be observed
 * @param {('show'|'showHide')} mode - showHide shows and hides the element on screen enter or leave, show only detects entering the screen and the keeps it rendered
 * @param {string} rootMargin - margin that will be added around the element to detect visibility
 * @param {number} delay - defines the debounce delay of the visibility detection
 * @returns {{isVisible: Ref<boolean>}}
 */
export const useIsVisible = ({ target, mode = "show", rootMargin = "100px", delay = 0 }) => {
  const isSupported = window && "IntersectionObserver" in window
  if (!isSupported) {
    return {
      isVisible: ref(true),
    }
  }

  const isVisible = ref(false)
  const observer = new IntersectionObserver(
    debounce(([{ isIntersecting }]) => {
      isVisible.value = isIntersecting
      /**
       * if given mode is `showHide` we need to keep the observation alive.
       */
      if (mode === "showHide") {
        return
      }
      /**
       * if the mode is `show` which is the default, the implementation needs to unsubscribe the target from the observer
       */
      if (!isVisible.value) {
        return
      }

      observer.unobserve(target.value)
    }, delay),
    {
      rootMargin,
    }
  )

  watch(target, () => {
    observer.observe(target.value)
  })

  onBeforeUnmount(() => observer.disconnect())

  return {
    isVisible,
  }
}
