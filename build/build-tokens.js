const StyleDictionary = require("style-dictionary")
const path = require("path")
const yaml = require("yaml")
const { transformNamespace, transformColor } = require("./build-tokens/transform")
const { formatJSONMap, formatSCSS } = require("./build-tokens/format")

StyleDictionary.registerTransform(transformColor)
StyleDictionary.registerTransform(transformNamespace)
StyleDictionary.registerFormat(formatJSONMap)
StyleDictionary.registerFormat(formatSCSS)

StyleDictionary.extend({
  parsers: [
    {
      pattern: /\.yaml$/,
      parse: ({ contents }) => yaml.parse(contents),
    },
  ],
  source: [path.join(__dirname, "../src/tokens/**/*.yaml")],
  platforms: {
    default: {
      transforms: ["name/cti/kebab", "ods/namespace", "ods/color"],
      buildPath: "src/assets/tokens/",
      files: [
        {
          destination: "ods.scss",
          format: "ods/scss",
          filter: ({ filePath }) => filePath.includes("/ods/"),
        },
        {
          destination: "ods.json",
          format: "ods/json",
          filter: ({ filePath }) => filePath.includes("/ods/"),
        },
        {
          destination: "docs.scss",
          format: "ods/scss",
          filter: ({ filePath }) => filePath.includes("/docs/"),
        },
      ],
    },
  },
}).buildAllPlatforms()
