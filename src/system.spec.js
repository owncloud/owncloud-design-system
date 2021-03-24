import Vue from "vue"
import DesignSystem from "./system"

let options = {
  tokens: {
    colorPalette: {
      "background": "#ef23ab",
      "brand-primary": "#00FFFF",    
    }
  }
}

Vue.use(DesignSystem, options)

describe("Depending on what gets passed into the theming options", () => {
  it('Sets correct custom CSS props from theming options', () => {
    expect(document.documentElement.style.getPropertyValue('--oc-background')).toMatch('#ef23ab')
    expect(document.documentElement.style.getPropertyValue('--oc-brand-primary')).toMatch('#00FFFF')
  })
  // it('Defaults to ODS colors where none are passed in theming options', () => {
  //   expect(document.documentElement.style.getPropertyValue('--oc-color')).toMatch("green")
  //   expect(document.documentElement.style.getPropertyValue('--oc-brand-primary-hover')).toMatch('#223959')
  // })
})
