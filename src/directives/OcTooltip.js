import tippy from "tippy.js"
import __logger from "../utils/logger"

export const hideOnEsc = {
  name: "hideOnEsc",
  defaultValue: true,
  fn({ hide }) {
    const onKeyDown = e => {
      if (e.keyCode === 27) {
        hide()
      }
    }

    return {
      onShow: () => {
        document.addEventListener("keydown", onKeyDown)
      },
      onHide: () => {
        document.removeEventListener("keydown", onKeyDown)
      },
    }
  },
}

export const destroy = _tippy => {
  if (!_tippy) {
    return
  }

  try {
    _tippy.destroy()
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

    destroy(el._tippy)

    tippy(el, {
      content: value,
      interactive: true,
      ignoreAttributes: true,
      ...(Object.prototype.toString.call(value) === "[object Object]" && value),
      aria: {
        content: "describedby",
      },
      plugins: [hideOnEsc],
    })
  },
  unbind: function (el) {
    destroy(el._tippy)
  },
}
