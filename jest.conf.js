const path = require("path")

module.exports = {
  rootDir: path.resolve(__dirname, "./"),
  modulePaths: ["<rootDir>"],
  moduleFileExtensions: ["js", "json", "vue"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^.+\\.(css|less|scss)$": "babel-jest",
  },
  modulePathIgnorePatterns: ["<rootDir>/docs/utils/statusLabels.spec.js"],
  transform: {
    "^.+\\.js$": "<rootDir>/node_modules/babel-jest",
    ".*\\.(vue)$": "<rootDir>/node_modules/vue-jest",
    "^.+\\.svg$": "jest-svg-transformer",
  },
  setupFiles: ["./jest.setup.js"],
  snapshotSerializers: ["<rootDir>/node_modules/jest-serializer-vue"],
  coverageDirectory: "<rootDir>/coverage",
  collectCoverageFrom: [
    "<rootDir>/src/components/**/*.vue",
    "<rootDir>/src/utils/**/*.{js,vue}",
    "<rootDir>/src/system.js",
    "<rootDir>/docs/**/*.{js,vue}",
    "!<rootDir>/src/main.js",
    "!<rootDir>/src/router/index.js",
    "!<rootDir>/node_modules/**",
    "!<rootDir>/docs/docs.helper.js",
    "!<rootDir>/docs/components/status/*",
    "!<rootDir>/docs/components/Preview.js",
    "!<rootDir>/docs/utils/tabs.js",
  ],
}
