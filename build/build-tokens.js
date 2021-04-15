const StyleDictionary = require("style-dictionary")
const path = require("path")
const { color } = require("style-value-types")
const tinyColor = require("tinycolor2")

const propertiesSort = (a, b) => {
  if (a.name < b.name) return -1
  if (a.name > b.name) return 1

  return 0
}

const transformColor = {
  name: "ods/color",
  type: "value",
  transitive: true,
  matcher: prop => [path.parse(prop.filePath).name, prop.attributes.category].includes("color"),
  transformer: function ({ attributes, value }) {
    const color = tinyColor(value)

    color.lighten(parseInt(attributes?.transform?.lighten) || 0)
    color.brighten(parseInt(attributes?.transform?.brighten) || 0)
    color.darken(parseInt(attributes?.transform?.darken) || 0)
    color.desaturate(parseInt(attributes?.transform?.desaturate) || 0)
    color.saturate(parseInt(attributes?.transform?.saturate) || 0)

    return color.toRgbString()
  },
}

const transformNamespace = {
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

const formatJSONMap = {
  name: "ods/json",
  formatter: dictionary => {
    const extractCategory = prop => {
      const { category } = prop.arguments | {}
      return category || path.parse(prop.filePath).name
    }
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
        old: cur.old,
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

const formatSCSS = {
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

StyleDictionary.registerTransform(transformColor)
StyleDictionary.registerTransform(transformNamespace)
StyleDictionary.registerFormat(formatJSONMap)
StyleDictionary.registerFormat(formatSCSS)
StyleDictionary.extend({
  source: [path.join(__dirname, "../src/tokens/ods/**/*.json")],
  platforms: {
    ods: {
      transforms: ["name/cti/kebab", "ods/namespace", "ods/color"],
      buildPath: "src/assets/tokens/",
      files: [
        {
          destination: "ods.scss",
          format: "ods/scss",
        },
        {
          destination: "ods.json",
          format: "ods/json",
        },
      ],
    },
  },
}).buildAllPlatforms()

StyleDictionary.extend({
  source: [path.join(__dirname, "../src/tokens/docs/**/*.json")],
  platforms: {
    docs: {
      transforms: ["name/cti/kebab", "ods/namespace", "ods/color"],
      buildPath: "src/assets/tokens/",
      files: [
        {
          destination: "docs.scss",
          format: "ods/scss",
        },
      ],
    },
  },
}).buildAllPlatforms()
