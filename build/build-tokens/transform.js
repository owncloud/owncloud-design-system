const path = require("path")
const tinyColor = require("tinycolor2")
const { generateContrastColors } = require("@adobe/leonardo-contrast-colors")

exports.transformColor = {
  name: "ods/color",
  type: "value",
  transitive: true,
  matcher: prop => [path.parse(prop.filePath).name].includes("color"),
  transformer: function ({ value, attributes }) {
    const { color: colorAttributes } = attributes

    value = tinyColor(value)

    value.lighten(parseInt(colorAttributes?.lighten) || 0)
    value.brighten(parseInt(colorAttributes?.brighten) || 0)
    value.darken(parseInt(colorAttributes?.darken) || 0)
    value.desaturate(parseInt(colorAttributes?.desaturate) || 0)
    value.saturate(parseInt(colorAttributes?.saturate) || 0)

    value = value.toRgbString()

    if (colorAttributes?.a11y?.contrast) {
      value = generateContrastColors({
        colorKeys: [value],
        base: colorAttributes.a11y.base || "#ffffff",
        ratios: [colorAttributes.a11y.contrast],
        colorspace: "CAM02",
        output: "RGB",
      })[0]
    }

    return value
  },
}

exports.transformNamespace = {
  name: "ods/namespace",
  type: "name",
  transformer: function (prop) {
    const nameSpace = ["oc"]

    if (prop.filePath.split("/").some(n => n === "docs")) {
      nameSpace.push("docs")
    }

    nameSpace.push(prop.name)

    return nameSpace.filter(Boolean).join("-")
  },
}
