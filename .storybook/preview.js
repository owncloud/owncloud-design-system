import results from "../.jest-test-results.json"
import { withTests } from "@storybook/addon-jest"
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport"

export const decorators = [
  withTests({
    results,
  }),
]

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
}
