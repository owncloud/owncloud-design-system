import { create } from "@storybook/theming"

const colors = {
  primaryBlue: "#4a76ac",
  primaryOrange: "rgb(229,111,53)",
  swatchBlue: "#041e42",
  textDefault: "white",
  textMuted: "#f8f8f8"
} 

export default create({
  base: "dark",

  colorPrimary: colors.primaryBlue,
  colorSecondary: colors.primaryOrange,

  // UI
  appBg: colors.swatchBlue,
  appContentBg: colors.swatchBlue,
  appBorderColor: "grey",
  appBorderRadius: 4,

  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: "monospace",

  // Text colors
  textColor: colors.textDefault,
  textInverseColor: colors.primaryOrange,

  // Toolbar default and active colors
  barTextColor: colors.textMuted,
  barSelectedColor: colors.textDefault,
  barBg: colors.primaryBlue,

  // Form colors
  inputBg: "black",
  inputBorder: colors.textMuted,
  inputBorderRadius: 4,
  inputTextColor: colors.textMuted,

  brandTitle: "ownCloud Design System",
  brandUrl: "https://owncloud.design",
  brandImage: "",
})
