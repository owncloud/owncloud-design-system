const path = require("path")
const { color } = require("style-value-types")
const tinyColor = require("tinycolor2")

const propertiesSort = (a, b) => {
  if (a.name < b.name) return -1
  if (a.name > b.name) return 1

  return 0
}

exports.formatJSONMap = {
  name: "ods/json",
  formatter: dictionary => {
    const extractCategory = prop => prop.arguments?.category || path.parse(prop.filePath).name
    const extractType = prop => {
      const { type } = prop.arguments | {}

      if (type) {
        return type
      } else if (color.test(prop.value)) {
        return "color"
      } else if (!isNaN(parseInt(prop.value)) || !isNaN(parseFloat(prop.value))) {
        return "number"
      }

      return "..."
    }
    const data = dictionary.allProperties.sort(propertiesSort).reduce((acc, cur) => {
      const type = extractType(cur)
      const category = extractCategory(cur)
      const colorInfo = () => {
        if (type !== "color") {
          return
        }
        const color = tinyColor(cur.value)
        return {
          hex: color.toHexString(),
          rgb: color.toRgbString(),
          hsl: color.toHslString(),
          hsv: color.toHsvString(),
        }
      }

      acc[cur.name] = {
        value: cur.value,
        name: cur.name,
        type,
        category,
        info: {
          ...colorInfo(),
        },
      }
      return acc
    }, {})
    const rawData = Object.keys(data)
      .sort()
      .map(k => `  "${k}": ${JSON.stringify(data[k])}`)
      .join(",\n")

    return `{\n${rawData}\n}`
  },
}

exports.formatSCSS = {
  name: "ods/scss",
  formatter: dictionary => {
    return [
      ...dictionary.allProperties.sort(propertiesSort).map(p => `$${p.name}: ${p.value};\n`),
      "\n:root {\n",
      ...dictionary.allProperties.sort(propertiesSort).map(p => `  --${p.name}: #{$${p.name}};\n`),
      "}\n",
    ].join("")
  },
}
