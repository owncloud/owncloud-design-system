const path = require("path")

module.exports = {
  rootDir: path.resolve(__dirname, "./"),
  modulePaths: ["<rootDir>"],
  moduleFileExtensions: ["js", "json", "vue"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.js$": "<rootDir>/node_modules/babel-jest",
    ".*\\.(vue)$": "<rootDir>/node_modules/vue-jest",
  },
  setupFiles: ["./jest.setup.js"],
  snapshotSerializers: ["<rootDir>/node_modules/jest-serializer-vue"],
  coverageDirectory: "<rootDir>/coverage",
  collectCoverageFrom: [
    "<rootDir>/src/elements/**/*.vue",
    "<rootDir>/src/patterns/**/*.vue",
    "<rootDir>/src/templates/**/*.vue",
    "<rootDir>/src/utils/**/*.{js,vue}",
    "<rootDir>/docs/**/*.{js,vue}",
    "!<rootDir>/src/main.js",
    "!<rootDir>/src/router/index.js",
    "!<rootDir>/node_modules/**",
    "!<rootDir>/src/system.js",
    "!<rootDir>/docs/docs.helper.js",
    "!<rootDir>/docs/components/status/*",
    "!<rootDir>/docs/components/Preview.js",
    "!<rootDir>/docs/utils/tabs.js",
  ],
}
