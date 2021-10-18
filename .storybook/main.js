const path = require("path")
const { merge } = require("webpack-merge")

module.exports = {
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
    "../docs/**/*.stories.mdx",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
    "@storybook/addon-jest",
    "addon-screen-reader",
  ],
  webpackFinal: async (storybookWebpackConfig, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Return the altered config
    return merge(storybookWebpackConfig, {
      module: {
        rules: [
          {
            test: /\.scss$/,
            use: [
              { loader: "vue-style-loader" },
              { loader: "css-loader" },
              { loader: "postcss-loader" },
              { loader: "sass-loader" },
              {
                loader: "sass-resources-loader",
                options: {
                  resources: [
                    path.resolve(__dirname, "../src/assets/tokens/ods.scss"),
                    path.resolve(__dirname, "../src/styles/styles.scss"),
                  ],
                },
              },
            ],
            include: path.resolve(__dirname, "../"),
          },
        ],
      },
    })
  },
}
