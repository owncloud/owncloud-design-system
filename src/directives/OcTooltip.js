import tippy from "tippy.js"

const __logger = v => v

export const hideOnEsc = {
  name: "hideOnEsc",
  defaultValue: true,
  fn({ hide }) {
    function onKeyDown(event) {
      if (event.keyCode === 27) {
        hide()
      }
    }

    return {
      onShow() {
        document.addEventListener("keydown", onKeyDown)
      },
      onHide() {
        document.removeEventListener("keydown", onKeyDown)
      },
    }
  },
}

const destroy = el => {
  if (!el._tippy) {
    return
  }

  try {
    el._tippy.destroy()
  } catch (e) {
    __logger(e)
  }
}

export default {
  name: "OcTooltip",
  bind: function (el, { value }) {
    if (!value) {
      return
    }

    destroy(el)

    tippy(el, {
      content: value,
      interactive: true,
      ignoreAttributes: true,
      ...(Object.prototype.toString.call(value) === "[object Object]" && value),
      plugins: [hideOnEsc],
    })
  },
  unbind: function (el) {
    destroy(el)
  },
}
