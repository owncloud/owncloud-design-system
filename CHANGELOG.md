# Changelog for [6.0.0] (2021-04-16)

The following sections list the changes in ownCloud Design System 6.0.0.

[6.0.0]: https://github.com/owncloud/owncloud-design-system/compare/v5.1.0...v6.0.0

## Summary

* Change - Use style-dictionary instead of theo: [#1217](https://github.com/owncloud/owncloud-design-system/pull/1217)
* Enhancement - Table sorting: [#1219](https://github.com/owncloud/owncloud-design-system/pull/1219)

## Details

* Change - Use style-dictionary instead of theo: [#1217](https://github.com/owncloud/owncloud-design-system/pull/1217)

   We've used theo to generate tokens, it was a bit cumbersome to manage global aliases and hard to
   define property based filters.

   From now on we use amazon style-dictionary to generate the tokens which is more flexible. In the
   same process we renamed the tokens to get a more meaningful naming convention for css // scss
   variables.

   https://github.com/owncloud/owncloud-design-system/pull/1217


* Enhancement - Table sorting: [#1219](https://github.com/owncloud/owncloud-design-system/pull/1219)

   The latest version of OcTable and OcTableFiles had no more sorting. We brought it back. It can be
   enabled by simply adding a `sortable: true` to table fields.

   https://github.com/owncloud/owncloud-design-system/pull/1219

# Changelog for [5.1.0] (2021-04-15)

The following sections list the changes in ownCloud Design System 5.1.0.

[5.1.0]: https://github.com/owncloud/owncloud-design-system/compare/v5.0.1...v5.1.0

## Summary

* Bugfix - Remove fixed login logo width: [#1207](https://github.com/owncloud/owncloud-design-system/pull/1207)
* Bugfix - Muted color class: [#1210](https://github.com/owncloud/owncloud-design-system/pull/1210)
* Enhancement - OcCheckbox remove aria checked: [#1212](https://github.com/owncloud/owncloud-design-system/pull/1212)
* Enhancement - Text-inital helper class: [#1211](https://github.com/owncloud/owncloud-design-system/pull/1211)
* Enhancement - Update tag border color: [#1213](https://github.com/owncloud/owncloud-design-system/pull/1213)

## Details

* Bugfix - Remove fixed login logo width: [#1207](https://github.com/owncloud/owncloud-design-system/pull/1207)

   The logo displayed on login/error pages had a fixed width and height, wich was fine for the
   provided ownCloud logo but produced suboptimal results when using files with other
   width/height ratios. By changing this to max-width & max-height we allow for other files while
   keeping their proper aspect ratio.

   https://github.com/owncloud/owncloud-design-system/pull/1207


* Bugfix - Muted color class: [#1210](https://github.com/owncloud/owncloud-design-system/pull/1210)

   The `uk-text-muted` class caused some inconsistancy in ownCloud-web, sometimes being
   overwritten by default uikit styles. Changing it to `oc-text-muted` and updating the
   references in ownCloud-web should prevent this.

   https://github.com/owncloud/owncloud-design-system/pull/1210


* Enhancement - OcCheckbox remove aria checked: [#1212](https://github.com/owncloud/owncloud-design-system/pull/1212)

   We've introduced `aria-checked` on the checkbox component but since then learned it's
   redundant information, so we're removing it again.

   https://github.com/owncloud/owncloud-design-system/pull/1212


* Enhancement - Text-inital helper class: [#1211](https://github.com/owncloud/owncloud-design-system/pull/1211)

   Introducing a `oc-text-inital` class to set font-size, e.g. in headings, back to `1rem`.

   https://github.com/owncloud/owncloud-design-system/pull/1211


* Enhancement - Update tag border color: [#1213](https://github.com/owncloud/owncloud-design-system/pull/1213)

   The OcTag border color didn't offer enough contrast, so it's been updated to match the font
   color. Also, the OcTag styles have been moved to the component level.

   https://github.com/owncloud/owncloud-design-system/pull/1213

# Changelog for [5.0.1] (2021-04-08)

The following sections list the changes in ownCloud Design System 5.0.1.

[5.0.1]: https://github.com/owncloud/owncloud-design-system/compare/v5.0.0...v5.0.1

## Summary

* Bugfix - Add missing peerDependency: [#1205](https://github.com/owncloud/owncloud-design-system/pull/1205)

## Details

* Bugfix - Add missing peerDependency: [#1205](https://github.com/owncloud/owncloud-design-system/pull/1205)

   In the 5.0.0 release, we missed to add the dependency for `vue-inline-svg` to the
   peerDependencies.

   https://github.com/owncloud/owncloud-design-system/pull/1205

# Changelog for [5.0.0] (2021-04-08)

The following sections list the changes in ownCloud Design System 5.0.0.

[5.0.0]: https://github.com/owncloud/owncloud-design-system/compare/v4.3.0...v5.0.0

## Summary

* Change - Use peerDependencies instead of dependencies: [#1202](https://github.com/owncloud/owncloud-design-system/pull/1202)
* Enhancement - Export translations: [#1201](https://github.com/owncloud/owncloud-design-system/pull/1201)

## Details

* Change - Use peerDependencies instead of dependencies: [#1202](https://github.com/owncloud/owncloud-design-system/pull/1202)

   In the past we used dependencies in package.json which can blow up the bundle size a lot. Expect
   this, it is also possible that the same package with 2 versions is part of the bundle.

   From now on dependencies that are required to use ODS are added to the peerDependencies section
   in package.json. Then the consuming application has to add the dependency on it's own and can
   decide which minor or bugfix version to use.

   https://github.com/owncloud/owncloud-design-system/pull/1202


* Enhancement - Export translations: [#1201](https://github.com/owncloud/owncloud-design-system/pull/1201)

   Some ODS components depend on translations and they correctly get pulled from Transifex into
   `l10n/translations.json`, yet we never exported them for other projects to use. Now, they get
   copied into the `dist` folder and can be imported and used alongside the styles and components.

   https://github.com/owncloud/owncloud-design-system/pull/1201

# Changelog for [4.3.0] (2021-04-07)

The following sections list the changes in ownCloud Design System 4.3.0.

[4.3.0]: https://github.com/owncloud/owncloud-design-system/compare/v4.2.1...v4.3.0

## Summary

* Bugfix - Embed svg images: [#1198](https://github.com/owncloud/owncloud-design-system/pull/1198)
* Enhancement - Create `oc-select` component: [#1198](https://github.com/owncloud/owncloud-design-system/pull/1198)

## Details

* Bugfix - Embed svg images: [#1198](https://github.com/owncloud/owncloud-design-system/pull/1198)

   We've changed the way how svg images get loaded in oc-icon. Before this, svg images where
   transformed to data urls by webpack. Now, we use require to inline them, which prevents the
   browser from doing a XMLHttpRequest that can lead to problems with the
   content-security-police.

   https://github.com/owncloud/owncloud-design-system/pull/1198


* Enhancement - Create `oc-select` component: [#1198](https://github.com/owncloud/owncloud-design-system/pull/1198)

   We've created a new component called `oc-select`. This component is based on
   [vue-select](https://vue-select.org/) and can be used to selecting values in a dropdown.

   https://github.com/owncloud/owncloud-design-system/pull/1198

# Changelog for [4.2.1] (2021-04-01)

The following sections list the changes in ownCloud Design System 4.2.1.

[4.2.1]: https://github.com/owncloud/owncloud-design-system/compare/v4.2.0...v4.2.1

## Summary

* Bugfix - Use primary text color for the dropzone: [#1192](https://github.com/owncloud/owncloud-design-system/pull/1192)
* Bugfix - Progressbar background color: [#1192](https://github.com/owncloud/owncloud-design-system/pull/1192)

## Details

* Bugfix - Use primary text color for the dropzone: [#1192](https://github.com/owncloud/owncloud-design-system/pull/1192)

   We've changed the color of the dropzone hint message to the `oc-color` so that the text is
   visible even when brand and background colors are both dark.

   https://github.com/owncloud/owncloud-design-system/pull/1192


* Bugfix - Progressbar background color: [#1192](https://github.com/owncloud/owncloud-design-system/pull/1192)

   The progressbar background color wasn't theme-able and therefore inherited uikit-styles
   that provided undesired results on dark backgrounds. It now uses the text-muted color for the
   background.

   https://github.com/owncloud/owncloud-design-system/pull/1192

# Changelog for [4.2.0] (2021-03-31)

The following sections list the changes in ownCloud Design System 4.2.0.

[4.2.0]: https://github.com/owncloud/owncloud-design-system/compare/v4.1.2...v4.2.0

## Summary

* Bugfix - Input border variable: [#1187](https://github.com/owncloud/owncloud-design-system/pull/1187)
* Enhancement - Use oc-color for breadcrumbs: [#1189](https://github.com/owncloud/owncloud-design-system/pull/1189)
* Enhancement - Add `oc-text-lead` class: [#1189](https://github.com/owncloud/owncloud-design-system/pull/1189)
* Enhancement - Unify input colors: [#1190](https://github.com/owncloud/owncloud-design-system/pull/1190)

## Details

* Bugfix - Input border variable: [#1187](https://github.com/owncloud/owncloud-design-system/pull/1187)

   The custom CSS prop for `input-border` had a duplicate and wrong dash and was therefore not
   rendered correctly.

   https://github.com/owncloud/owncloud-design-system/pull/1187


* Enhancement - Use oc-color for breadcrumbs: [#1189](https://github.com/owncloud/owncloud-design-system/pull/1189)

   We've changed the colour of breadcrumbs to use the `oc-color` instead of the brand color.

   https://github.com/owncloud/owncloud-design-system/pull/1189


* Enhancement - Add `oc-text-lead` class: [#1189](https://github.com/owncloud/owncloud-design-system/pull/1189)

   We've added a utility class called `oc-text-lead` which is increasing the font size of the
   text.

   https://github.com/owncloud/owncloud-design-system/pull/1189


* Enhancement - Unify input colors: [#1190](https://github.com/owncloud/owncloud-design-system/pull/1190)

   `OcAutocomplete`, `OcTextInput`, `OcTextarea` and `OcSearchBar` had all slightly
   different ways of using variables to defined border- and text-colors. This change introduces
   two dedicated color varaibles for text inside input fields (for theme-ability) and unifies
   their usage. It also moves the styles for these components from a stylesheet each into a
   `<style>` tag in each Vue component.

   https://github.com/owncloud/owncloud-design-system/pull/1190

# Changelog for [4.1.2] (2021-03-31)

The following sections list the changes in ownCloud Design System 4.1.2.

[4.1.2]: https://github.com/owncloud/owncloud-design-system/compare/v4.1.1...v4.1.2

## Summary

* Bugfix - Breadcrumb font size: [#1185](https://github.com/owncloud/owncloud-design-system/pull/1185)
* Bugfix - Links in oc-avatar-group: [#1184](https://github.com/owncloud/owncloud-design-system/pull/1184)
* Bugfix - Modal title variation: [#1185](https://github.com/owncloud/owncloud-design-system/pull/1185)
* Bugfix - Muted text uikit class: [#1185](https://github.com/owncloud/owncloud-design-system/pull/1185)
* Bugfix - No underline on button hover: [#1185](https://github.com/owncloud/owncloud-design-system/pull/1185)

## Details

* Bugfix - Breadcrumb font size: [#1185](https://github.com/owncloud/owncloud-design-system/pull/1185)

   The `lead` class in breadcrumbs didn't resize the font to match `<h1>` tags. This fix brings
   back the old behavior.

   https://github.com/owncloud/owncloud-design-system/pull/1185


* Bugfix - Links in oc-avatar-group: [#1184](https://github.com/owncloud/owncloud-design-system/pull/1184)

   The oc-avatar-group was showing all link, ignoring the `maxDisplayed` property. We fixed
   that by properly cutting off the items used for rendering avatars.

   https://github.com/owncloud/owncloud-design-system/pull/1184


* Bugfix - Modal title variation: [#1185](https://github.com/owncloud/owncloud-design-system/pull/1185)

   The modal variation was only reflected in the title color in the `danger` variation. Now, the
   title colors gets correctly adapted to any of the 5 possible variations

   https://github.com/owncloud/owncloud-design-system/pull/1185


* Bugfix - Muted text uikit class: [#1185](https://github.com/owncloud/owncloud-design-system/pull/1185)

   The `uk-text-muted` was overwritten to correctly use CI colors.

   https://github.com/owncloud/owncloud-design-system/pull/1185


* Bugfix - No underline on button hover: [#1185](https://github.com/owncloud/owncloud-design-system/pull/1185)

   When hovering `<button>`s we don't want to display an underline to differentiate them
   properly from `<a>`s and `<router-link>`s.

   https://github.com/owncloud/owncloud-design-system/pull/1185

# Changelog for [4.1.1] (2021-03-30)

The following sections list the changes in ownCloud Design System 4.1.1.

[4.1.1]: https://github.com/owncloud/owncloud-design-system/compare/v4.1.0...v4.1.1

## Summary

* Bugfix - OcTextInput Coloring: [#1182](https://github.com/owncloud/owncloud-design-system/pull/1182)

## Details

* Bugfix - OcTextInput Coloring: [#1182](https://github.com/owncloud/owncloud-design-system/pull/1182)

   The OcTextInput input validation didn't correctly change to the `danger` or `warning` color
   variations (discovered this when checking the modals in `web`). This change fixes it,
   correctly changing colors when the validation gets triggered.

   https://github.com/owncloud/owncloud-design-system/pull/1182

# Changelog for [4.1.0] (2021-03-26)

The following sections list the changes in ownCloud Design System 4.1.0.

[4.1.0]: https://github.com/owncloud/owncloud-design-system/compare/v4.0.0...v4.1.0

## Summary

* Enhancement - Add messages to autocomplete component: [#1174](https://github.com/owncloud/owncloud-design-system/pull/1174)
* Enhancement - Datepicker input style: [#1176](https://github.com/owncloud/owncloud-design-system/pull/1176)
* Enhancement - Turn placeholders in OcModal into descriptionMessages: [#1172](https://github.com/owncloud/owncloud-design-system/pull/1172)

## Details

* Enhancement - Add messages to autocomplete component: [#1174](https://github.com/owncloud/owncloud-design-system/pull/1174)

   The component supports 3 kinds of messages: description, warning and error. The description
   message will basically replace the informative text which was displayed via placeholder.
   While it's still possible to use a placeholder if you need it, we encourage you to not use it
   anymore. A label is always required, a description message can be added if more context is
   needed.

   https://github.com/owncloud/owncloud-design-system/pull/1174


* Enhancement - Datepicker input style: [#1176](https://github.com/owncloud/owncloud-design-system/pull/1176)

   The input style of the datepicker now matches with the ones we use in other components (like text
   input e.g.).

   https://github.com/owncloud/owncloud-design-system/pull/1176


* Enhancement - Turn placeholders in OcModal into descriptionMessages: [#1172](https://github.com/owncloud/owncloud-design-system/pull/1172)

   We have dropped the support for placeholders in the `<oc-text-input>` component. As this
   component is used inside OcModal, this change also drops placeholder support and adds the
   possibilty to instead make use of a descriptionMessage (which is only being display if no
   inputError is present).

   https://github.com/owncloud/owncloud-design-system/pull/1172

# Changelog for [4.0.0] (2021-03-25)

The following sections list the changes in ownCloud Design System 4.0.0.

[4.0.0]: https://github.com/owncloud/owncloud-design-system/compare/v3.2.2...v4.0.0

## Summary

* Bugfix - Increase the datepicker z-index: [#1147](https://github.com/owncloud/owncloud-design-system/pull/1147)
* Change - Add label to the autocomplete component: [#1156](https://github.com/owncloud/owncloud-design-system/pull/1156)
* Change - Add properties to make icons and images a11y-compliant: [#1161](https://github.com/owncloud/owncloud-design-system/pull/1161)
* Change - Remove URL prop from icons: [#1082](https://github.com/owncloud/owncloud-design-system/pull/1082)
* Change - Refactor variations & color palette: [#1140](https://github.com/owncloud/owncloud-design-system/pull/1140)
* Enhancement - Add focus border to accordion items: [#1158](https://github.com/owncloud/owncloud-design-system/pull/1158)
* Enhancement - Add label and messages to datepicker: [#1149](https://github.com/owncloud/owncloud-design-system/pull/1149)
* Enhancement - Add label and messages to textarea: [#1144](https://github.com/owncloud/owncloud-design-system/pull/1144)
* Enhancement - Make alert component a11y-compliant: [#1166](https://github.com/owncloud/owncloud-design-system/pull/1166)
* Enhancement - Add aria label to the home icon within the breadcrumb: [#1152](https://github.com/owncloud/owncloud-design-system/pull/1152)
* Enhancement - Add aria properties to checkbox: [#1145](https://github.com/owncloud/owncloud-design-system/pull/1145)
* Enhancement - Element nesting: [#1155](https://github.com/owncloud/owncloud-design-system/pull/1155)
* Enhancement - Add aria properties to radio input: [#1148](https://github.com/owncloud/owncloud-design-system/pull/1148)
* Enhancement - Remove the OcTextInput component from the OcSearchBar component: [#1151](https://github.com/owncloud/owncloud-design-system/pull/1151)
* Enhancement - Make searchbar component a11y-compliant: [#1164](https://github.com/owncloud/owncloud-design-system/pull/1164)
* Enhancement - Implement labels and descriptions for text input fields: [#1141](https://github.com/owncloud/owncloud-design-system/pull/1141)
* Enhancement - Initialize the design system with themable colors: [#1168](https://github.com/owncloud/owncloud-design-system/pull/1168)

## Details

* Bugfix - Increase the datepicker z-index: [#1147](https://github.com/owncloud/owncloud-design-system/pull/1147)

   The z-index of the datepicker modal was set to 1, which is a pretty small value for a modal window.
   As a result the date picker modal has been displayed behind the code example in the design
   system.

   https://github.com/owncloud/owncloud-design-system/pull/1147


* Change - Add label to the autocomplete component: [#1156](https://github.com/owncloud/owncloud-design-system/pull/1156)

   Adding the label "from the outside" is not a11y compliant as you cannot get the id of the actual
   input element which therefore cannot be referenced. This change also removes all the
   unnecessary prefixes which were used in the component.

   https://github.com/owncloud/web/issues/4329
   https://github.com/owncloud/owncloud-design-system/pull/1156


* Change - Add properties to make icons and images a11y-compliant: [#1161](https://github.com/owncloud/owncloud-design-system/pull/1161)

   https://github.com/owncloud/owncloud-design-system/pull/1161


* Change - Remove URL prop from icons: [#1082](https://github.com/owncloud/owncloud-design-system/pull/1082)

   We've removed the URL prop from icons which was replacing the internal icons with an image
   loading the icon from arbitrary URLs. As of now, only internal icons can be used in the `oc-icon`
   component.

   https://github.com/owncloud/owncloud-design-system/pull/1082


* Change - Refactor variations & color palette: [#1140](https://github.com/owncloud/owncloud-design-system/pull/1140)

   We have updated the ownCloud Design System colors, removing duplicates, introducing CI
   colors and explicitly adding colors that formerly were calculated or came from uikit.

   We have also unified the usage of "variations" that are used to give visual clues about
   different usages of the same components. Icons, buttons, modals and notifications (and
   perhaps others) can now have the variations `passive, primary, success, danger, warning`.

   While doing that, we also replaced the SASS variables in `src/` with custom CSS properties
   which are overwrite-able at runtime, so theming the ODS is possible now (at least from a colors
   perspective, font sizes and spacing will eventually follow).

   https://github.com/owncloud/owncloud-design-system/pull/1140
   https://github.com/owncloud/owncloud-design-system/pull/1169


* Enhancement - Add focus border to accordion items: [#1158](https://github.com/owncloud/owncloud-design-system/pull/1158)

   https://github.com/owncloud/owncloud-design-system/pull/1158


* Enhancement - Add label and messages to datepicker: [#1149](https://github.com/owncloud/owncloud-design-system/pull/1149)

   This also implies all the necessary accessibility changes.

   https://github.com/owncloud/owncloud-design-system/pull/1149


* Enhancement - Add label and messages to textarea: [#1144](https://github.com/owncloud/owncloud-design-system/pull/1144)

   This also implies all the necessary accessibility changes.

   https://github.com/owncloud/owncloud-design-system/pull/1144


* Enhancement - Make alert component a11y-compliant: [#1166](https://github.com/owncloud/owncloud-design-system/pull/1166)

   It is now possible to reach and submit the "close"-button of an alert via keyboard. This change
   also removes the "uk-close" icon as it is not a11y-compliant.

   https://github.com/owncloud/owncloud-design-system/pull/1166


* Enhancement - Add aria label to the home icon within the breadcrumb: [#1152](https://github.com/owncloud/owncloud-design-system/pull/1152)

   https://github.com/owncloud/web/issues/4329
   https://github.com/owncloud/owncloud-design-system/pull/1152


* Enhancement - Add aria properties to checkbox: [#1145](https://github.com/owncloud/owncloud-design-system/pull/1145)

   This also implies all the necessary accessibility changes.

   https://github.com/owncloud/owncloud-design-system/pull/1145


* Enhancement - Element nesting: [#1155](https://github.com/owncloud/owncloud-design-system/pull/1155)

   Fix the nesting for some html elements to make them w3c compliant.

   https://github.com/owncloud/owncloud-design-system/pull/1155


* Enhancement - Add aria properties to radio input: [#1148](https://github.com/owncloud/owncloud-design-system/pull/1148)

   This also implies all the necessary accessibility changes.

   https://github.com/owncloud/owncloud-design-system/pull/1148


* Enhancement - Remove the OcTextInput component from the OcSearchBar component: [#1151](https://github.com/owncloud/owncloud-design-system/pull/1151)

   Also replace the loading spinner with the OcSpinner component in the course of this.

   https://github.com/owncloud/owncloud-design-system/pull/1151


* Enhancement - Make searchbar component a11y-compliant: [#1164](https://github.com/owncloud/owncloud-design-system/pull/1164)

   It is now possible to reach and submit the "clear"-button within the search bar via keyboard.
   After a search query has been cleared, the input will be focused again. This change also removes
   the "uk-close" icon as it is not a11y-compliant.

   https://github.com/owncloud/owncloud-design-system/issues/1160
   https://github.com/owncloud/owncloud-design-system/pull/1164


* Enhancement - Implement labels and descriptions for text input fields: [#1141](https://github.com/owncloud/owncloud-design-system/pull/1141)

   This also implies all the required accessibility changes.

   https://github.com/owncloud/owncloud-design-system/pull/1141


* Enhancement - Initialize the design system with themable colors: [#1168](https://github.com/owncloud/owncloud-design-system/pull/1168)

   By passing suitable plugin options, you can overwrite the CSS color variables within the ODS to
   adjust it to your likings. The default color values are generated from within the design system
   and act as a fallback if no (or not all) options are passed when initializing the design system
   plugin.

   https://github.com/owncloud/owncloud-design-system/pull/1168

# Changelog for [3.2.2] (2021-03-22)

The following sections list the changes in ownCloud Design System 3.2.2.

[3.2.2]: https://github.com/owncloud/owncloud-design-system/compare/v3.2.1...v3.2.2

## Summary

* Bugfix - Remove leading comma from link avatar group tooltip: [#1165](https://github.com/owncloud/owncloud-design-system/pull/1165)

## Details

* Bugfix - Remove leading comma from link avatar group tooltip: [#1165](https://github.com/owncloud/owncloud-design-system/pull/1165)

   We fixed a bug in the oc-avatar-group component, which showed a leading ", " in its tooltip in
   case it was only about links.

   https://github.com/owncloud/owncloud-design-system/pull/1165

# Changelog for [3.2.1] (2021-03-17)

The following sections list the changes in ownCloud Design System 3.2.1.

[3.2.1]: https://github.com/owncloud/owncloud-design-system/compare/v3.2.0...v3.2.1

## Summary

* Bugfix - Folder names with dots: [#1153](https://github.com/owncloud/owncloud-design-system/pull/1153)

## Details

* Bugfix - Folder names with dots: [#1153](https://github.com/owncloud/owncloud-design-system/pull/1153)

   Folder names with dots showed were separated into a basename and extension part in the
   oc-resource-name component, which has been fixed. Additionally, the oc-resource-name
   component now as a `resource-type` attribute, which reflects the `type` property of the
   displayed resource. This makes testing easier.

   https://github.com/owncloud/owncloud-design-system/pull/1153

# Changelog for [3.2.0] (2021-03-12)

The following sections list the changes in ownCloud Design System 3.2.0.

[3.2.0]: https://github.com/owncloud/owncloud-design-system/compare/v3.0.0...v3.2.0

## Summary

* Bugfix - Use correct color for the accordion title: [#1130](https://github.com/owncloud/owncloud-design-system/pull/1130)
* Bugfix - Update table component in OcIcon docs: [#1127](https://github.com/owncloud/owncloud-design-system/pull/1127)
* Bugfix - Update OcSwitch docs: [#1135](https://github.com/owncloud/owncloud-design-system/pull/1135)
* Enhancement - Use accessible labels for avatars in the avatars group component: [#1126](https://github.com/owncloud/owncloud-design-system/pull/1126)
* Enhancement - Extract SAAS functionality from `src/` to `docs/``: [#1134](https://github.com/owncloud/owncloud-design-system/pull/1134)
* Enhancement - Improve documentation for image and user component: [#1133](https://github.com/owncloud/owncloud-design-system/pull/1133)
* Enhancement - Remove filetype icon variation: [#1139](https://github.com/owncloud/owncloud-design-system/pull/1139)

## Details

* Bugfix - Use correct color for the accordion title: [#1130](https://github.com/owncloud/owncloud-design-system/pull/1130)

   In the last release, we introduced a regression in the accordion component. The custom color
   set for its title had not been respected and the button color was used instead. We've fixed this
   to use the custom color again.

   https://github.com/owncloud/owncloud-design-system/pull/1130


* Bugfix - Update table component in OcIcon docs: [#1127](https://github.com/owncloud/owncloud-design-system/pull/1127)

   The `<oc-table>` component had a breaking change in the *2.1.0* release, which broke the
   [oc-icon component docs](https://owncloud.design/#/oC%20Components/OcIcon). To fix it
   we needed to use the new `<oc-table-simple>` component instead, which mimics the behaviour of
   the old `<oc-table>` component.

   https://github.com/owncloud/owncloud-design-system/pull/1127


* Bugfix - Update OcSwitch docs: [#1135](https://github.com/owncloud/owncloud-design-system/pull/1135)

   The OcSwitch documentation was featuring the `<oc-star>` component which was dropped a while
   ago. This change deletes an obsolete `oc-star.scss` file and updates the OcSwitch
   documentation by displaying its reactive functionality using other HTML elements.

   https://github.com/owncloud/owncloud-design-system/pull/1135


* Enhancement - Use accessible labels for avatars in the avatars group component: [#1126](https://github.com/owncloud/owncloud-design-system/pull/1126)

   We've added the accessible labels for all avatars in the avatars group component because they
   are shown there without any supporting label thus rendering them hidden from screen readers.

   https://github.com/owncloud/owncloud-design-system/pull/1126


* Enhancement - Extract SAAS functionality from `src/` to `docs/``: [#1134](https://github.com/owncloud/owncloud-design-system/pull/1134)

   Some SCSS-files were only used to build the ODS documentation, but lived within the design
   system styles. We moved them to the documentation folder to avoid shipping them with the
   official ODS releases.

   https://github.com/owncloud/owncloud-design-system/pull/1134


* Enhancement - Improve documentation for image and user component: [#1133](https://github.com/owncloud/owncloud-design-system/pull/1133)

   Changed the documentation markup for more semantic HTML that also looks better.

   https://github.com/owncloud/owncloud-design-system/pull/1133


* Enhancement - Remove filetype icon variation: [#1139](https://github.com/owncloud/owncloud-design-system/pull/1139)

   This icon variation wasn't really used anywhere but added duplicate CSS rules and could
   therefore be removed.

   https://github.com/owncloud/owncloud-design-system/pull/1139

# Changelog for [3.0.0] (2021-02-24)

The following sections list the changes in ownCloud Design System 3.0.0.

[3.0.0]: https://github.com/owncloud/owncloud-design-system/compare/v3.1.0...v3.0.0

## Summary

* Bugfix - Button hover color: [#1091](https://github.com/owncloud/owncloud-design-system/pull/1091)
* Bugfix - Missing logo in OcSidebar: [#1090](https://github.com/owncloud/owncloud-design-system/pull/1090)
* Change - Merge resource target path with folder path: [#1085](https://github.com/owncloud/owncloud-design-system/pull/1085)
* Change - Make dropzone component public: [#1100](https://github.com/owncloud/owncloud-design-system/pull/1100)
* Change - Remove basic styles: [#1084](https://github.com/owncloud/owncloud-design-system/pull/1084)
* Change - Add resource path attribute to oc-resource-name: [#1103](https://github.com/owncloud/owncloud-design-system/pull/1103)
* Change - Pass object as the target route: [#1102](https://github.com/owncloud/owncloud-design-system/pull/1102)
* Change - Use values as keys for table cells: [#1094](https://github.com/owncloud/owncloud-design-system/pull/1094)
* Change - Use resources instead of ids in selection model: [#1095](https://github.com/owncloud/owncloud-design-system/pull/1095)
* Change - Text utility classes: [#1115](https://github.com/owncloud/owncloud-design-system/pull/1115)
* Enhancement - Add link avatar component: [#1101](https://github.com/owncloud/owncloud-design-system/pull/1101)
* Enhancement - Add prop for the table header position: [#1092](https://github.com/owncloud/owncloud-design-system/pull/1092)
* Enhancement - Remove the trailing slash from resource target path: [#1087](https://github.com/owncloud/owncloud-design-system/pull/1087)
* Enhancement - Add `disabled` prop to table components: [#1093](https://github.com/owncloud/owncloud-design-system/pull/1093)
* Enhancement - Add table footer: [#1099](https://github.com/owncloud/owncloud-design-system/pull/1099)
* Enhancement - Add `isSelectable` prop to files table component: [#1093](https://github.com/owncloud/owncloud-design-system/pull/1093)

## Details

* Bugfix - Button hover color: [#1091](https://github.com/owncloud/owncloud-design-system/pull/1091)

   When hovering the oc-button (*primary*) component had different styling, depending on if it
   was used as `a` or `button` tag. This was caused by the underlying `ui-kit` styles, since no
   specific component-based styling was provided. By making the hover styling explicit in the
   component stylesheet, this is fixed.

   https://github.com/owncloud/owncloud-design-system/pull/1091


* Bugfix - Missing logo in OcSidebar: [#1090](https://github.com/owncloud/owncloud-design-system/pull/1090)

   After to changes in the formerly referenced structure of the ownCloud.com website, no logo was
   displayed in the sidebar anymore. Due to license changes in this repository, it was decided not
   to include an ownCloud-branded logo anymore, so this change adds a placeholder svg file in
   `assets/example/`.

   https://github.com/owncloud/owncloud-design-system/pull/1090


* Change - Merge resource target path with folder path: [#1085](https://github.com/owncloud/owncloud-design-system/pull/1085)

   We've merged the resource target route path with the folder path in the `router-link`. When
   passing the path as a parameter, it wasn't being recognised and the navigation just pointed to
   the target route path. By explicitly merging them, we make sure that the navigation behaves as
   expected.

   https://github.com/owncloud/owncloud-design-system/pull/1085


* Change - Make dropzone component public: [#1100](https://github.com/owncloud/owncloud-design-system/pull/1100)

   We've made the dropzone component public so that it appears in the documentation.

   https://github.com/owncloud/owncloud-design-system/pull/1100


* Change - Remove basic styles: [#1084](https://github.com/owncloud/owncloud-design-system/pull/1084)

   We've removed styles from the body element and from the #oc-content element. We were forcing
   styles on a global level which were too specific and because of that limited the usage of the
   design system. Any specific styling like that should be done in the consuming app.

   https://github.com/owncloud/owncloud-design-system/pull/1084


* Change - Add resource path attribute to oc-resource-name: [#1103](https://github.com/owncloud/owncloud-design-system/pull/1103)

   We added a custom attribute to the oc-resource-name component which contains the full
   resource path. While this is not needed for rendering the component, this makes end to end
   testing much easier.

   https://github.com/owncloud/owncloud-design-system/pull/1103


* Change - Pass object as the target route: [#1102](https://github.com/owncloud/owncloud-design-system/pull/1102)

   We've changed the `targetRoute` prop in the `oc-resource` component to accept an object
   instead of a string. This object is now accepting keys `name`, `params` and `query`. Only
   `name` is required. All keys are then passed to the router link which enables using more complex
   routes.

   https://github.com/owncloud/owncloud-design-system/pull/1102


* Change - Use values as keys for table cells: [#1094](https://github.com/owncloud/owncloud-design-system/pull/1094)

   We've started using values as keys for the table cells so that they are reactive to the changes in
   values.

   https://github.com/owncloud/owncloud-design-system/pull/1094


* Change - Use resources instead of ids in selection model: [#1095](https://github.com/owncloud/owncloud-design-system/pull/1095)

   We changed the selection model of the `oc-table-files` component to use resources instead of
   their ids.

   https://github.com/owncloud/owncloud-design-system/pull/1095


* Change - Text utility classes: [#1115](https://github.com/owncloud/owncloud-design-system/pull/1115)

   We introduced text utility classes for deciding if a text element should break into multiple
   lines, prevent line breaks or truncate text with an ellipsis.

   https://github.com/owncloud/owncloud-design-system/pull/1115


* Enhancement - Add link avatar component: [#1101](https://github.com/owncloud/owncloud-design-system/pull/1101)

   We've created a link avatar component which mimics styles of the avatar component.

   https://github.com/owncloud/owncloud-design-system/pull/1101


* Enhancement - Add prop for the table header position: [#1092](https://github.com/owncloud/owncloud-design-system/pull/1092)

   We've added a prop which is defining the top position of the table header if the `sticky` prop is
   set to `true`.

   https://github.com/owncloud/owncloud-design-system/pull/1092


* Enhancement - Remove the trailing slash from resource target path: [#1087](https://github.com/owncloud/owncloud-design-system/pull/1087)

   We've removed the trailing slash from the resource target path. We're merging target path with
   the folder path into one and place a slash in between them. Having trailing slash in the target
   path resulted in two slashes in the final path.

   https://github.com/owncloud/owncloud-design-system/pull/1087


* Enhancement - Add `disabled` prop to table components: [#1093](https://github.com/owncloud/owncloud-design-system/pull/1093)

   We've added `disabled` prop to `oc-table` and `oc-table-files` components. This prop is used
   to pass IDs of disabled resources so that they are clearly distinguishable from the other
   resources.

   https://github.com/owncloud/owncloud-design-system/pull/1093


* Enhancement - Add table footer: [#1099](https://github.com/owncloud/owncloud-design-system/pull/1099)

   We've added a footer to the table and table files components. To add any content to the footer,
   use `footer` slot.

   https://github.com/owncloud/owncloud-design-system/pull/1099


* Enhancement - Add `isSelectable` prop to files table component: [#1093](https://github.com/owncloud/owncloud-design-system/pull/1093)

   We've added `isSelectable` prop to `oc-table-files` component. This prop is used to assert
   whether resources in the table can be selected.

   https://github.com/owncloud/owncloud-design-system/pull/1093

# Changelog for [3.1.0] (2021-02-24)

The following sections list the changes in ownCloud Design System 3.1.0.

[3.1.0]: https://github.com/owncloud/owncloud-design-system/compare/v2.1.2...v3.1.0

## Summary

* Enhancement - Add name attribute in the resource name component: [#1119](https://github.com/owncloud/owncloud-design-system/pull/1119)

## Details

* Enhancement - Add name attribute in the resource name component: [#1119](https://github.com/owncloud/owncloud-design-system/pull/1119)

   We've added a `resource-name` data attribute in the `oc-resource-name` component which
   equals the concatenated resource path, name and extension.

   https://github.com/owncloud/owncloud-design-system/pull/1119

# Changelog for [2.1.2] (2021-01-21)

The following sections list the changes in ownCloud Design System 2.1.2.

[2.1.2]: https://github.com/owncloud/owncloud-design-system/compare/v2.1.1...v2.1.2

## Summary

* Change - Pin UIkit version to 3.5.16: [#1064](https://github.com/owncloud/owncloud-design-system/pull/1064)

## Details

* Change - Pin UIkit version to 3.5.16: [#1064](https://github.com/owncloud/owncloud-design-system/pull/1064)

   We've pinned the version of UIkit to 3.5.16. The reason for this is that the version 3.5.17
   caused a regression to our autocomplete component. Since we want to remove UIkit from the ODS in
   the near future, we are not taking the time to come up with a fix. We do not plan to upgrade UIkit
   anymore.

   https://github.com/owncloud/owncloud-design-system/pull/1064

# Changelog for [2.1.1] (2021-01-21)

The following sections list the changes in ownCloud Design System 2.1.1.

[2.1.1]: https://github.com/owncloud/owncloud-design-system/compare/v2.1.0...v2.1.1

## Summary

* Bugfix - Fix uniqueId: [#1060](https://github.com/owncloud/owncloud-design-system/pull/1060)

## Details

* Bugfix - Fix uniqueId: [#1060](https://github.com/owncloud/owncloud-design-system/pull/1060)

   The uniqueId helper function returned a callback instead of a string.

   https://github.com/owncloud/owncloud-design-system/pull/1060

# Changelog for [2.1.0] (2021-01-19)

The following sections list the changes in ownCloud Design System 2.1.0.

[2.1.0]: https://github.com/owncloud/owncloud-design-system/compare/v2.0.4...v2.1.0

## Summary

* Change - Create new table component: [#1177](https://github.com/owncloud/ocis/issues/1177)
* Enhancement - Introduce breakpoints tokens and utility classes: [#1045](https://github.com/owncloud/owncloud-design-system/pull/1045)
* Enhancement - Create new files table component: [#1177](https://github.com/owncloud/ocis/issues/1177)

## Details

* Change - Create new table component: [#1177](https://github.com/owncloud/ocis/issues/1177)

   We've dropped the table component and created a new one from scratch. The new component is
   defining its fields and data via props. To still use more "traditional" table, take a look at
   component `OcTableSimple`.

   https://github.com/owncloud/ocis/issues/1177
   https://github.com/owncloud/owncloud-design-system/pull/1034
   https://github.com/owncloud/owncloud-design-system/pull/1050


* Enhancement - Introduce breakpoints tokens and utility classes: [#1045](https://github.com/owncloud/owncloud-design-system/pull/1045)

   We've added tokens and utility classes to dynamically display/hide content depending on the
   breakpoints.

   https://github.com/owncloud/owncloud-design-system/pull/1045


* Enhancement - Create new files table component: [#1177](https://github.com/owncloud/ocis/issues/1177)

   We've built a new files table component which has a set of pre-defined fields. Which fields will
   be displayed depends on the provided resources. This component also wraps a few other
   components:

   - OcResource - OcAvatarGroup

   https://github.com/owncloud/ocis/issues/1177
   https://github.com/owncloud/owncloud-design-system/pull/1034
   https://github.com/owncloud/owncloud-design-system/pull/1050

# Changelog for [2.0.4] (2020-12-15)

The following sections list the changes in ownCloud Design System 2.0.4.

[2.0.4]: https://github.com/owncloud/owncloud-design-system/compare/v2.0.3...v2.0.4

## Summary

* Bugfix - Positioning of dropzone: [#1052](https://github.com/owncloud/ocis/issues/1052)

## Details

* Bugfix - Positioning of dropzone: [#1052](https://github.com/owncloud/ocis/issues/1052)

   Switch oc-dropzone positioning from fixed to absolute, fixed always orientates by the
   viewport which means it always covers the entire screen. This is something we can't know and the
   decision should be left to the consuming app.

   Instead we use position absolute to just cover the next parent which ist positioned relative to
   the viewport. In situations where the body is higher or wider than the viewport fixed works
   better because absolute won't cover the scrollable parts of the content.

   Since oc apps always do scrolling on their own this is no problem

   https://github.com/owncloud/ocis/issues/1052

# Changelog for [2.0.3] (2020-12-12)

The following sections list the changes in ownCloud Design System 2.0.3.

[2.0.3]: https://github.com/owncloud/owncloud-design-system/compare/v2.0.2...v2.0.3

## Summary

* Bugfix - Breadcrumb icon floating: [#1053](https://github.com/owncloud/ocis/issues/1053)

## Details

* Bugfix - Breadcrumb icon floating: [#1053](https://github.com/owncloud/ocis/issues/1053)

   Home icon in breadcrumb don't break into second line anymore

   https://github.com/owncloud/ocis/issues/1053
   https://github.com/owncloud/owncloud-design-system/pull/997

# Changelog for [2.0.2] (2020-12-07)

The following sections list the changes in ownCloud Design System 2.0.2.

[2.0.2]: https://github.com/owncloud/owncloud-design-system/compare/v2.0.1...v2.0.2

## Summary

* Bugfix - Add `to` prop to `oc-tag` component: [#975](https://github.com/owncloud/owncloud-design-system/pull/975)
* Enhancement - Add new icons: [#975](https://github.com/owncloud/owncloud-design-system/pull/975)

## Details

* Bugfix - Add `to` prop to `oc-tag` component: [#975](https://github.com/owncloud/owncloud-design-system/pull/975)

   We've added an optional `to` prop to the `oc-tag` component so that it is properly assigned to
   the element in case of `router-link` type.

   https://github.com/owncloud/owncloud-design-system/pull/975


* Enhancement - Add new icons: [#975](https://github.com/owncloud/owncloud-design-system/pull/975)

   We've added a `key` and `checklist` icons.

   https://github.com/owncloud/owncloud-design-system/pull/975
   https://fontawesome.com/icons/key?style=solid
   https://fontawesome.com/icons/tasks?style=solid

# Changelog for [2.0.1] (2020-12-02)

The following sections list the changes in ownCloud Design System 2.0.1.

[2.0.1]: https://github.com/owncloud/owncloud-design-system/compare/v2.0.0...v2.0.1

## Summary

* Bugfix - Fix component docs: [#937](https://github.com/owncloud/owncloud-design-system/pull/937)

## Details

* Bugfix - Fix component docs: [#937](https://github.com/owncloud/owncloud-design-system/pull/937)

   The docs were broken after merging Elements and Patterns into a Components section.
   Apparently `Components` is not allowed as section name for technical reasons, so we renamed it
   to `oC Components`.

   https://github.com/owncloud/owncloud-design-system/pull/937

# Changelog for [2.0.0] (2020-11-23)

The following sections list the changes in ownCloud Design System 2.0.0.

[2.0.0]: https://github.com/owncloud/owncloud-design-system/compare/v1.15.0...v2.0.0

## Summary

* Change - Change license to Apache 2: [#933](https://github.com/owncloud/owncloud-design-system/pull/933)
* Change - Move all elements into components section: [#933](https://github.com/owncloud/owncloud-design-system/pull/933)
* Enhancement - Add tag component: [#927](https://github.com/owncloud/owncloud-design-system/pull/927)

## Details

* Change - Change license to Apache 2: [#933](https://github.com/owncloud/owncloud-design-system/pull/933)

   We've changed the license of the design system to Apache 2.

   https://github.com/owncloud/owncloud-design-system/pull/933


* Change - Move all elements into components section: [#933](https://github.com/owncloud/owncloud-design-system/pull/933)

   We've moved all elements into a new section called components.

   https://github.com/owncloud/owncloud-design-system/pull/933


* Enhancement - Add tag component: [#927](https://github.com/owncloud/owncloud-design-system/pull/927)

   We've added a tag component which is to be used for displaying various information.

   https://github.com/owncloud/owncloud-design-system/pull/927

# Changelog for [1.15.0] (2020-11-04)

The following sections list the changes in ownCloud Design System 1.15.0.

[1.15.0]: https://github.com/owncloud/owncloud-design-system/compare/v1.14.0...v1.15.0

## Summary

* Change - Introduce mode for accordion: [#925](https://github.com/owncloud/owncloud-design-system/pull/925)
* Change - Add folder open icon: [#923](https://github.com/owncloud/owncloud-design-system/pull/923)
* Enhancement - Add color prop to buttons: [#924](https://github.com/owncloud/owncloud-design-system/pull/924)

## Details

* Change - Introduce mode for accordion: [#925](https://github.com/owncloud/owncloud-design-system/pull/925)

   The oc-accordion component was allowing both clicks on accordion items and modified property
   values for `expandedId`/`expandedIds` to modify the internal state of the accordion. We now
   introduced a property `mode`, which defaults to `click`, for selecting the mode for
   controlling the internal state. From now on it can be either click or data, but not mixed
   anymore.

   https://github.com/owncloud/owncloud-design-system/pull/925


* Change - Add folder open icon: [#923](https://github.com/owncloud/owncloud-design-system/pull/923)

   We added an icon for `folder open`

   https://github.com/owncloud/owncloud-design-system/pull/923


* Enhancement - Add color prop to buttons: [#924](https://github.com/owncloud/owncloud-design-system/pull/924)

   We've added a new property to the button component to enable setting a different color when the
   variation is set to `raw`. Available colors are `default`, `primary` and `text`.

   https://github.com/owncloud/owncloud-design-system/pull/924

# Changelog for [1.14.0] (2020-10-28)

The following sections list the changes in ownCloud Design System 1.14.0.

[1.14.0]: https://github.com/owncloud/owncloud-design-system/compare/v1.13.0...v1.14.0

## Summary

* Change - Accordion improvements: [#916](https://github.com/owncloud/owncloud-design-system/pull/916)
* Change - Add file version icon: [#917](https://github.com/owncloud/owncloud-design-system/pull/917)

## Details

* Change - Accordion improvements: [#916](https://github.com/owncloud/owncloud-design-system/pull/916)

   We improved the accordion component to allow external control for the expanded/collapsed
   state of accordion items.

   https://github.com/owncloud/owncloud-design-system/pull/916


* Change - Add file version icon: [#917](https://github.com/owncloud/owncloud-design-system/pull/917)

   We added an icon for `file version`

   https://github.com/owncloud/owncloud-design-system/pull/917

# Changelog for [1.13.0] (2020-10-28)

The following sections list the changes in ownCloud Design System 1.13.0.

[1.13.0]: https://github.com/owncloud/owncloud-design-system/compare/v1.12.2...v1.13.0

## Summary

* Change - New accordion component implementation: [#911](https://github.com/owncloud/owncloud-design-system/pull/911)

## Details

* Change - New accordion component implementation: [#911](https://github.com/owncloud/owncloud-design-system/pull/911)

   We rewrote the accordion component to remove UIKit styles and align with our own styling. Some
   accessibility aspects are already implement, for example expanding and collapsing
   accordion items by pressing space or enter already works. More will come later on.

   https://github.com/owncloud/owncloud-design-system/pull/911

# Changelog for [1.12.2] (2020-10-26)

The following sections list the changes in ownCloud Design System 1.12.2.

[1.12.2]: https://github.com/owncloud/owncloud-design-system/compare/v1.12.1...v1.12.2

## Summary

* Change - Adjust styles of buttons with disabled state: [#909](https://github.com/owncloud/owncloud-design-system/pull/909)
* Change - Remove fill color for document icon: [#902](https://github.com/owncloud/owncloud-design-system/pull/902)

## Details

* Change - Adjust styles of buttons with disabled state: [#909](https://github.com/owncloud/owncloud-design-system/pull/909)

   We've changed the background color of buttons with disabled state to properly differentiate
   them from all other buttons.

   https://github.com/owncloud/owncloud-design-system/pull/909


* Change - Remove fill color for document icon: [#902](https://github.com/owncloud/owncloud-design-system/pull/902)

   We've removed the hardcoded fill color of the document icon.

   https://github.com/owncloud/owncloud-design-system/pull/902

# Changelog for [1.12.1] (2020-10-05)

The following sections list the changes in ownCloud Design System 1.12.1.

[1.12.1]: https://github.com/owncloud/owncloud-design-system/compare/v1.12.0...v1.12.1

## Summary

* Bugfix - Icon variation on notification message: [#843](https://github.com/owncloud/owncloud-design-system/issues/843)
* Bugfix - Use correct input background color: [#892](https://github.com/owncloud/owncloud-design-system/pull/892)

## Details

* Bugfix - Icon variation on notification message: [#843](https://github.com/owncloud/owncloud-design-system/issues/843)

   We fixed a bug in the notification message component where the a wrong variation was applied to
   icons.

   https://github.com/owncloud/owncloud-design-system/issues/843
   https://github.com/owncloud/owncloud-design-system/pull/893


* Bugfix - Use correct input background color: [#892](https://github.com/owncloud/owncloud-design-system/pull/892)

   We've moved definition of the input background color from hook into its class.

   https://github.com/owncloud/owncloud-design-system/pull/892

# Changelog for [1.12.0] (2020-10-03)

The following sections list the changes in ownCloud Design System 1.12.0.

[1.12.0]: https://github.com/owncloud/owncloud-design-system/compare/v1.11.1...v1.12.0

## Summary

* Change - Small design improvements: [#890](https://github.com/owncloud/owncloud-design-system/pull/890)
* Change - Add flat style for oc-loader: [#884](https://github.com/owncloud/owncloud-design-system/pull/884)
* Change - Updated checkbox and radiobutton components: [#890](https://github.com/owncloud/owncloud-design-system/pull/890)
* Enhancement - Add margin and padding utility classes: [#890](https://github.com/owncloud/owncloud-design-system/pull/890)

## Details

* Change - Small design improvements: [#890](https://github.com/owncloud/owncloud-design-system/pull/890)

   We've changed a few color design tokens. We've rotated the `link` icon 45 degrees to the left.
   We've changed the spacing values and united them in one design token for both margin and
   padding.

   https://github.com/owncloud/owncloud-design-system/pull/890


* Change - Add flat style for oc-loader: [#884](https://github.com/owncloud/owncloud-design-system/pull/884)

   The oc-loader component now has a `flat` style, which removes the border radius and shrinks the
   height. It can be enabled by setting the `flat` property on the component to `true`. With this
   the visual appearance of the loader is less prominent.

   https://github.com/owncloud/owncloud-design-system/pull/884


* Change - Updated checkbox and radiobutton components: [#890](https://github.com/owncloud/owncloud-design-system/pull/890)

   We updated the OcCheckbox and OcRadio components so that it's possible to use them properly
   with `v-model`. OcRadio had the radiobutton on the right side of the label. We moved it over to
   the left side for consistency.

   https://github.com/owncloud/owncloud-design-system/pull/890


* Enhancement - Add margin and padding utility classes: [#890](https://github.com/owncloud/owncloud-design-system/pull/890)

   We've added utility classes which can assign margin and padding to elements. In their own
   subsections of utilities section in our design system documentation can be found how to use
   them.

   https://github.com/owncloud/owncloud-design-system/pull/890

# Changelog for [1.11.1] (2020-09-21)

The following sections list the changes in ownCloud Design System 1.11.1.

[1.11.1]: https://github.com/owncloud/owncloud-design-system/compare/v1.11.0...v1.11.1

## Summary

* Change - Switch UI icon: [#882](https://github.com/owncloud/owncloud-design-system/pull/882)

## Details

* Change - Switch UI icon: [#882](https://github.com/owncloud/owncloud-design-system/pull/882)

   We've added a new icon for switching between UI versions - or resources in general.

   https://github.com/owncloud/owncloud-design-system/pull/882

# Changelog for [1.11.0] (2020-09-18)

The following sections list the changes in ownCloud Design System 1.11.0.

[1.11.0]: https://github.com/owncloud/owncloud-design-system/compare/v1.10.1...v1.11.0

## Summary

* Bugfix - Pass event in button click handler: [#872](https://github.com/owncloud/owncloud-design-system/pull/872)
* Bugfix - Fix buttons in modal: [#876](https://github.com/owncloud/owncloud-design-system/pull/876)
* Change - Align buttons content to center: [#875](https://github.com/owncloud/owncloud-design-system/pull/875)
* Change - Use flexbox in buttons instead of css grid: [#873](https://github.com/owncloud/owncloud-design-system/pull/873)
* Change - Option for gap on oc-button: [#878](https://github.com/owncloud/owncloud-design-system/pull/878)
* Change - Option for justify-content on oc-button: [#878](https://github.com/owncloud/owncloud-design-system/pull/878)
* Change - Delete pages: [#876](https://github.com/owncloud/owncloud-design-system/pull/876)

## Details

* Bugfix - Pass event in button click handler: [#872](https://github.com/owncloud/owncloud-design-system/pull/872)

   The click event for oc-button now passes the actual click event into the handler.

   https://github.com/owncloud/owncloud-design-system/pull/872


* Bugfix - Fix buttons in modal: [#876](https://github.com/owncloud/owncloud-design-system/pull/876)

   We fixed the button layout of the oc-modal component, which was broken since we introduced our
   new oc-button.

   https://github.com/owncloud/owncloud-design-system/pull/876


* Change - Align buttons content to center: [#875](https://github.com/owncloud/owncloud-design-system/pull/875)

   We've aligned the buttons content to the center.

   https://github.com/owncloud/owncloud-design-system/pull/875


* Change - Use flexbox in buttons instead of css grid: [#873](https://github.com/owncloud/owncloud-design-system/pull/873)

   We've started using flexbox in the button component instead of css grid to position children
   correctly. This gives us more flexibility for the alignment of children.

   https://github.com/owncloud/owncloud-design-system/pull/873


* Change - Option for gap on oc-button: [#878](https://github.com/owncloud/owncloud-design-system/pull/878)

   OcButton now has a property for defining a `gap` value out of xsmall, small, normal, medium,
   large and xlarge. The sizes are the same as in our margin classes.

   https://github.com/owncloud/owncloud-design-system/pull/878


* Change - Option for justify-content on oc-button: [#878](https://github.com/owncloud/owncloud-design-system/pull/878)

   OcButton now has a property for defining a `justify-content` value out of left, center, right,
   space-between, space-around and space-evenly.

   https://github.com/owncloud/owncloud-design-system/pull/878
   https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content


* Change - Delete pages: [#876](https://github.com/owncloud/owncloud-design-system/pull/876)

   We deleted the pages from our documentation. They were showcasing some of our components, but
   hard to maintain.

   https://github.com/owncloud/owncloud-design-system/pull/876

# Changelog for [1.10.1] (2020-09-17)

The following sections list the changes in ownCloud Design System 1.10.1.

[1.10.1]: https://github.com/owncloud/owncloud-design-system/compare/v1.10.0...v1.10.1

## Summary

* Bugfix - Fix wrong extend syntax: [#870](https://github.com/owncloud/owncloud-design-system/pull/870)

## Details

* Bugfix - Fix wrong extend syntax: [#870](https://github.com/owncloud/owncloud-design-system/pull/870)

   We've fixed the wrong extend syntax in oc-user-menu which was written in LESS. This syntax
   caused an issue with loading all styles and e.g. margin utility classes were not working.

   https://github.com/owncloud/owncloud-design-system/pull/870

# Changelog for [1.10.0] (2020-09-16)

The following sections list the changes in ownCloud Design System 1.10.0.

[1.10.0]: https://github.com/owncloud/owncloud-design-system/compare/v1.9.0...v1.10.0

## Summary

* Change - Add prop to hide navigation in sidebar: [#859](https://github.com/owncloud/owncloud-design-system/pull/859)
* Change - Remove icon prop from buttons and use css grid: [#418](https://github.com/owncloud/owncloud-design-system/pull/418)
* Enhancement - Add new icons: [#858](https://github.com/owncloud/owncloud-design-system/pull/858)
* Enhancement - Add visibility off icon: [#855](https://github.com/owncloud/owncloud-design-system/pull/855)

## Details

* Change - Add prop to hide navigation in sidebar: [#859](https://github.com/owncloud/owncloud-design-system/pull/859)

   We added a prop for the sidebar component to hide the navigation. This is a breaking change, as we
   removed the internal logic hiding the navigation entirely in favor of the new prop.

   https://github.com/owncloud/owncloud-design-system/pull/859


* Change - Remove icon prop from buttons and use css grid: [#418](https://github.com/owncloud/owncloud-design-system/pull/418)

   We've removed the prop which was responsible for displaying icons in the button component. To
   add an icon into the button, it needs to be included in the slot together with the text. We've
   added css grid into the button to ensure that all child items of the button will have a predefined
   gutter between them. We've removed all UIKit button styles from the button component.

   https://github.com/owncloud/owncloud-design-system/pull/418
   https://github.com/owncloud/owncloud-design-system/pull/865


* Enhancement - Add new icons: [#858](https://github.com/owncloud/owncloud-design-system/pull/858)

   We've added new icons which can be used to symbolise adding new shares, creating links and
   shared with lists. We've also removed a wrong fill color from visibility off icon.

   https://github.com/owncloud/owncloud-design-system/pull/858
   https://github.com/owncloud/owncloud-design-system/pull/864
   https://fontawesome.com/icons/share-square?style=solid
   https://material.io/resources/icons/?search=group&icon=group_add&style=baseline


* Enhancement - Add visibility off icon: [#855](https://github.com/owncloud/owncloud-design-system/pull/855)

   We've added a new icon to represent state when visibility is off. This can be used e.g. when
   toggling the visibility of a password.

   https://github.com/owncloud/owncloud-design-system/pull/855
   https://material.io/resources/icons/?search=eye&icon=visibility_off&style=baseline

# Changelog for [1.9.0] (2020-07-28)

The following sections list the changes in ownCloud Design System 1.9.0.

[1.9.0]: https://github.com/owncloud/owncloud-design-system/compare/v1.8.0...v1.9.0

## Summary

* Enhancement - Add new variations and sizes of progress bar: [#819](https://github.com/owncloud/owncloud-design-system/pull/819)

## Details

* Enhancement - Add new variations and sizes of progress bar: [#819](https://github.com/owncloud/owncloud-design-system/pull/819)

   We've added new variations and sizes of the progress bar component. Variations change the
   color of the progress bar and can be either `primary` or `warning`. Sizes affect the height of
   the progress bar where it can be either `default` or `small`.

   https://github.com/owncloud/owncloud-design-system/pull/819

# Changelog for [1.8.0] (2020-07-03)

The following sections list the changes in ownCloud Design System 1.8.0.

[1.8.0]: https://github.com/owncloud/owncloud-design-system/compare/v1.7.0...v1.8.0

## Summary

* Change - Use oc-spinner css class in oc-search-bar component: [#802](https://github.com/owncloud/owncloud-design-system/pull/802)
* Enhancement - Show dropdown in autocomplete on focus: [#804](https://github.com/owncloud/owncloud-design-system/pull/804)
* Enhancement - Add lead breadcrumb variation: [#806](https://github.com/owncloud/owncloud-design-system/pull/806)
* Enhancement - Add mainContent slot to the sidebar: [#804](https://github.com/owncloud/owncloud-design-system/pull/804)
* Enhancement - Add move icon: [#807](https://github.com/owncloud/owncloud-design-system/pull/807)

## Details

* Change - Use oc-spinner css class in oc-search-bar component: [#802](https://github.com/owncloud/owncloud-design-system/pull/802)

   UiKit spinner is not supporting IE11. The css classes around oc-spinner have been introduces
   previously and now they are used in the component oc-search-bar as well.

   https://github.com/owncloud/owncloud-design-system/pull/802


* Enhancement - Show dropdown in autocomplete on focus: [#804](https://github.com/owncloud/owncloud-design-system/pull/804)

   In case the input is focused and it still has a value the dropdown will open

   https://github.com/owncloud/owncloud-design-system/pull/804


* Enhancement - Add lead breadcrumb variation: [#806](https://github.com/owncloud/owncloud-design-system/pull/806)

   We've added a lead variation to the breadcrumbs. This variation gives large font size to
   breadcrumb items.

   https://github.com/owncloud/owncloud-design-system/pull/806


* Enhancement - Add mainContent slot to the sidebar: [#804](https://github.com/owncloud/owncloud-design-system/pull/804)

   We've added slot called mainContent into the sidebar component. This slot replaces the
   navigation if defined.

   https://github.com/owncloud/owncloud-design-system/pull/804


* Enhancement - Add move icon: [#807](https://github.com/owncloud/owncloud-design-system/pull/807)

   We've added the material design folder move icon.

   https://github.com/owncloud/owncloud-design-system/pull/807

# Changelog for [1.7.0] (2020-06-17)

The following sections list the changes in ownCloud Design System 1.7.0.

[1.7.0]: https://github.com/owncloud/owncloud-design-system/compare/v1.6.0...v1.7.0

## Summary

* Enhancement - Bring oC primary brand and interaction colors: [#546](https://github.com/owncloud/owncloud-design-system/issues/546)
* Enhancement - Improve the design of buttons: [#784](https://github.com/owncloud/owncloud-design-system/issues/784)
* Enhancement - Increase the logo clearspace: [#786](https://github.com/owncloud/owncloud-design-system/issues/786)
* Enhancement - Automatically focus modal: [#781](https://github.com/owncloud/owncloud-design-system/pull/781)
* Enhancement - Use Source Sans Pro: [#785](https://github.com/owncloud/owncloud-design-system/issues/785)

## Details

* Enhancement - Bring oC primary brand and interaction colors: [#546](https://github.com/owncloud/owncloud-design-system/issues/546)

   We've brought the ownCloud corporate identity brand and interaction colors. The primary
   brand colour is used as a background in the sidebar. Interaction colours are used in buttons and
   links.

   https://github.com/owncloud/owncloud-design-system/issues/546
   https://github.com/owncloud/owncloud-design-system/pull/791


* Enhancement - Improve the design of buttons: [#784](https://github.com/owncloud/owncloud-design-system/issues/784)

   We've added border-radius to buttons, added shadow to the primary button and adjusted
   font-weight and padding.

   https://github.com/owncloud/owncloud-design-system/issues/784
   https://github.com/owncloud/owncloud-design-system/issues/777
   https://github.com/owncloud/owncloud-design-system/pull/791


* Enhancement - Increase the logo clearspace: [#786](https://github.com/owncloud/owncloud-design-system/issues/786)

   We've increased the gutter between top corner of the sidebar and the logo. We've also decreased
   the size of the logo itself.

   https://github.com/owncloud/owncloud-design-system/issues/786
   https://github.com/owncloud/owncloud-design-system/pull/791


* Enhancement - Automatically focus modal: [#781](https://github.com/owncloud/owncloud-design-system/pull/781)

   When the modal is mounted, it receives automatically a focus. The focus is sent directly to the
   modal itself so skipping the wrapping div which works only as a background.

   https://github.com/owncloud/owncloud-design-system/pull/781


* Enhancement - Use Source Sans Pro: [#785](https://github.com/owncloud/owncloud-design-system/issues/785)

   We've started using Source Sans Pro in the default theme as the font.

   https://github.com/owncloud/owncloud-design-system/issues/785
   https://github.com/owncloud/owncloud-design-system/pull/791

# Changelog for [1.6.0] (2020-05-26)

The following sections list the changes in ownCloud Design System 1.6.0.

[1.6.0]: https://github.com/owncloud/owncloud-design-system/compare/v1.5.0...v1.6.0

## Summary

* Bugfix - Made modal position fixed: [#769](https://github.com/owncloud/owncloud-design-system/pull/769)
* Change - Removed change and keydown events from text input: [#768](https://github.com/owncloud/owncloud-design-system/pull/768)

## Details

* Bugfix - Made modal position fixed: [#769](https://github.com/owncloud/owncloud-design-system/pull/769)

   We've made the position of modal fixed and added z-index so it is always going to be visible on top
   of the content.

   https://github.com/owncloud/owncloud-design-system/pull/769


* Change - Removed change and keydown events from text input: [#768](https://github.com/owncloud/owncloud-design-system/pull/768)

   We've removed change and keydown custom events from text input component. All listeners are
   passed to the input element so all events are still accessible. Focus and input events are still
   implemented as custom events.

   https://github.com/owncloud/owncloud-design-system/pull/768

# Changelog for [1.5.0] (2020-05-13)

The following sections list the changes in ownCloud Design System 1.5.0.

[1.5.0]: https://github.com/owncloud/owncloud-design-system/compare/v1.4.0...v1.5.0

## Summary

* Bugfix - Do not try to emit value after confirming modal if input is missing: [#749](https://github.com/owncloud/owncloud-design-system/pull/749)
* Bugfix - Disable confirm button in the modal component if there is an error: [#741](https://github.com/owncloud/owncloud-design-system/pull/741)
* Bugfix - Use input event instead of keydown in the modal component: [#741](https://github.com/owncloud/owncloud-design-system/pull/741)
* Bugfix - Do not mutate input value prop in the modal directly: [#741](https://github.com/owncloud/owncloud-design-system/pull/741)
* Change - Do not enforce muted color as background of app bar: [#750](https://github.com/owncloud/owncloud-design-system/pull/750)
* Change - Deprecated application menu component: [#735](https://github.com/owncloud/owncloud-design-system/pull/735)
* Enhancement - Created sidebar component: [#735](https://github.com/owncloud/owncloud-design-system/pull/735)
* Enhancement - Created animation section in docs: [#735](https://github.com/owncloud/owncloud-design-system/pull/735)

## Details

* Bugfix - Do not try to emit value after confirming modal if input is missing: [#749](https://github.com/owncloud/owncloud-design-system/pull/749)

   Confirming modal resulted in an error if the modal haven't got an input. We've fixed this by not
   attempting to emit the value if the prop `hasInput` is set to false.

   https://github.com/owncloud/owncloud-design-system/pull/749


* Bugfix - Disable confirm button in the modal component if there is an error: [#741](https://github.com/owncloud/owncloud-design-system/pull/741)

   We've added check to disable confirm button in the modal component in case the input inside of
   the modal has an error.

   https://github.com/owncloud/owncloud-design-system/pull/741


* Bugfix - Use input event instead of keydown in the modal component: [#741](https://github.com/owncloud/owncloud-design-system/pull/741)

   We've started using the input event instead of the keydown in the modal component to properly
   pass the value of the input.

   https://github.com/owncloud/owncloud-design-system/pull/741


* Bugfix - Do not mutate input value prop in the modal directly: [#741](https://github.com/owncloud/owncloud-design-system/pull/741)

   We've used a local state as a v-model of the input in the modal to avoid direct mutations of the
   input value property.

   https://github.com/owncloud/owncloud-design-system/pull/741


* Change - Do not enforce muted color as background of app bar: [#750](https://github.com/owncloud/owncloud-design-system/pull/750)

   We've stopped enforcing the muted color as a background of the app bar.

   https://github.com/owncloud/owncloud-design-system/pull/750


* Change - Deprecated application menu component: [#735](https://github.com/owncloud/owncloud-design-system/pull/735)

   We've deprecated the application menu component in favor of the sidebar component.

   https://github.com/owncloud/owncloud-design-system/pull/735


* Enhancement - Created sidebar component: [#735](https://github.com/owncloud/owncloud-design-system/pull/735)

   We've created a sidebar component which is to be used as an in-app navigation and which will
   contain the branding.

   https://github.com/owncloud/owncloud-design-system/pull/735


* Enhancement - Created animation section in docs: [#735](https://github.com/owncloud/owncloud-design-system/pull/735)

   We've added an animation section in the documentation to show available animations and how to
   use them.

   https://github.com/owncloud/owncloud-design-system/pull/735

# Changelog for [1.4.0] (2020-04-29)

The following sections list the changes in ownCloud Design System 1.4.0.

[1.4.0]: https://github.com/owncloud/owncloud-design-system/compare/v1.3.0...v1.4.0

## Summary

* Enhancement - Extended the modal component with input: [#730](https://github.com/owncloud/owncloud-design-system/pull/730)

## Details

* Enhancement - Extended the modal component with input: [#730](https://github.com/owncloud/owncloud-design-system/pull/730)

   We've added an input into the modal component which can be displayed via prop. If the input is
   displayed, the message gets overridden. The content slot can override the input. In the
   confirm event is now emitted the value of input.

   https://github.com/owncloud/owncloud-design-system/pull/730

# Changelog for [1.3.0] (2020-04-23)

The following sections list the changes in ownCloud Design System 1.3.0.

[1.3.0]: https://github.com/owncloud/owncloud-design-system/compare/v1.2.2...v1.3.0

## Summary

* Enhancement - Added the modal component: [#723](https://github.com/owncloud/owncloud-design-system/pull/723)

## Details

* Enhancement - Added the modal component: [#723](https://github.com/owncloud/owncloud-design-system/pull/723)

   We've added the modal component together with a basic documentation.

   https://github.com/owncloud/owncloud-design-system/pull/723

# Changelog for [1.2.2] (2020-04-08)

The following sections list the changes in ownCloud Design System 1.2.2.

[1.2.2]: https://github.com/owncloud/owncloud-design-system/compare/v1.2.1...v1.2.2

## Summary

* Bugfix - Fix oc-autocomplete: [#710](https://github.com/owncloud/owncloud-design-system/pull/710)

## Details

* Bugfix - Fix oc-autocomplete: [#710](https://github.com/owncloud/owncloud-design-system/pull/710)

   We fixed a bug in OcAutocomplete which was introduced with the removal of lodash as a
   dependency.

   https://github.com/owncloud/owncloud-design-system/pull/710

# Changelog for [1.2.1] (2020-04-07)

The following sections list the changes in ownCloud Design System 1.2.1.

[1.2.1]: https://github.com/owncloud/owncloud-design-system/compare/v1.2.0...v1.2.1

## Summary

* Bugfix - Correct layout of search bar: [#706](https://github.com/owncloud/owncloud-design-system/pull/706)
* Enhancement - Bind attributes and events to input in oc-text-input: [#706](https://github.com/owncloud/owncloud-design-system/pull/706)

## Details

* Bugfix - Correct layout of search bar: [#706](https://github.com/owncloud/owncloud-design-system/pull/706)

   We've fixed layout of search bar which was broken after we introduced error message in
   oc-text-input.

   https://github.com/owncloud/owncloud-design-system/pull/706


* Enhancement - Bind attributes and events to input in oc-text-input: [#706](https://github.com/owncloud/owncloud-design-system/pull/706)

   We've binded attributes and events to input in oc-text-input so that they are passed properly
   instead of passing them to the root element.

   https://github.com/owncloud/owncloud-design-system/pull/706

# Changelog for [1.2.0] (2020-03-27)

The following sections list the changes in ownCloud Design System 1.2.0.

[1.2.0]: https://github.com/owncloud/owncloud-design-system/compare/v1.1.1...v1.2.0

## Summary

* Bugfix - Fixed oc-text-input not appearing in generated docs: [#688](https://github.com/owncloud/owncloud-design-system/issues/688)
* Change - Render error and warning messages in oc-text-input: [#689](https://github.com/owncloud/owncloud-design-system/issues/689)

## Details

* Bugfix - Fixed oc-text-input not appearing in generated docs: [#688](https://github.com/owncloud/owncloud-design-system/issues/688)

   The oc-text-input element didn't appear in the generated docs because of a compilation
   warning.

   https://github.com/owncloud/owncloud-design-system/issues/688
   https://github.com/owncloud/owncloud-design-system/pull/690


* Change - Render error and warning messages in oc-text-input: [#689](https://github.com/owncloud/owncloud-design-system/issues/689)

   The oc-text-input element now has properties for rendering a warning or error message below
   the input field. The input field border receives the respective matching color as well. Also
   it's possible to reserve a fixed vertical space below the input element, so that an appearing
   message doesn't break the layout around the input element.

   https://github.com/owncloud/owncloud-design-system/issues/689
   https://github.com/owncloud/owncloud-design-system/pull/690

# Changelog for [1.1.1] (2020-03-18)

The following sections list the changes in ownCloud Design System 1.1.1.

[1.1.1]: https://github.com/owncloud/owncloud-design-system/compare/v1.1.0...v1.1.1

## Summary

* Bugfix - Fixed oc-icon to reload image when url changes: [#681](https://github.com/owncloud/owncloud-design-system/pull/681)

## Details

* Bugfix - Fixed oc-icon to reload image when url changes: [#681](https://github.com/owncloud/owncloud-design-system/pull/681)

   The oc-icon component will now reload its image whenever the url property has been modified

   https://github.com/owncloud/owncloud-design-system/pull/681

# Changelog for [1.1.0] (2020-03-17)

The following sections list the changes in ownCloud Design System 1.1.0.

[1.1.0]: https://github.com/owncloud/owncloud-design-system/compare/v1.0.4...v1.1.0

## Summary

* Bugfix - Made scrollbar styles consistent: [#660](https://github.com/owncloud/owncloud-design-system/pull/660)
* Bugfix - Removed width class from sidebar menu: [#668](https://github.com/owncloud/owncloud-design-system/issues/668)
* Enhancement - Added iconUrl to oc-file element: [#678](https://github.com/owncloud/owncloud-design-system/pull/678)

## Details

* Bugfix - Made scrollbar styles consistent: [#660](https://github.com/owncloud/owncloud-design-system/pull/660)

   Scrollbar styles are now more consistent between Chrome and Firefox.

   https://github.com/owncloud/owncloud-design-system/pull/660


* Bugfix - Removed width class from sidebar menu: [#668](https://github.com/owncloud/owncloud-design-system/issues/668)

   There were different values for width of the sidebar menu and it's left position when hidden.
   We've removed the width class so that the width and left position are the same and the sidebar
   menu is no more overlapping when it's state is hidden.

   https://github.com/owncloud/owncloud-design-system/issues/668
   https://github.com/owncloud/owncloud-design-system/pull/669


* Enhancement - Added iconUrl to oc-file element: [#678](https://github.com/owncloud/owncloud-design-system/pull/678)

   The oc-file element now supports passing an arbitrary URL to be displayed as a file thumbnail.
   It will fall back to the icon name in case the thumbnail could not be loaded.

   https://github.com/owncloud/owncloud-design-system/pull/678

# Changelog for [1.0.4] (2020-02-26)

The following sections list the changes in ownCloud Design System 1.0.4.

[1.0.4]: https://github.com/owncloud/owncloud-design-system/compare/v1.0.3...v1.0.4

## Summary

* Bugfix - Removed size for oc-button with raw variation: [#654](https://github.com/owncloud/owncloud-design-system/issues/654)

## Details

* Bugfix - Removed size for oc-button with raw variation: [#654](https://github.com/owncloud/owncloud-design-system/issues/654)

   Raw variation of buttons have no border, so they now also don't have a size enforced to avoid
   needless white space.

   https://github.com/owncloud/owncloud-design-system/issues/654

# Changelog for [1.0.3] (2020-02-25)

The following sections list the changes in ownCloud Design System 1.0.3.

[1.0.3]: https://github.com/owncloud/owncloud-design-system/compare/v1.0.2...v1.0.3

## Summary

* Bugfix - Removed uppercase on buttons: [#442](https://github.com/owncloud/owncloud-design-system/issues/442)

## Details

* Bugfix - Removed uppercase on buttons: [#442](https://github.com/owncloud/owncloud-design-system/issues/442)

   Buttons look nicer without the uppercase which was brought in by default by UIKit.

   https://github.com/owncloud/owncloud-design-system/issues/442
   https://github.com/owncloud/owncloud-design-system/pull/652

# Changelog for [1.0.2] (2020-02-24)

The following sections list the changes in ownCloud Design System 1.0.2.

[1.0.2]: https://github.com/owncloud/owncloud-design-system/compare/v1.0.1...v1.0.2

## Summary

* Change - Small sidebar navigation design improvements: [#583](https://github.com/owncloud/owncloud-design-system/issues/583)

## Details

* Change - Small sidebar navigation design improvements: [#583](https://github.com/owncloud/owncloud-design-system/issues/583)

   We've changed the padding of sidebar nav to small and removed text transformation to
   uppercase.

   https://github.com/owncloud/owncloud-design-system/issues/583
   https://github.com/owncloud/owncloud-design-system/pull/648

# Changelog for [1.0.1] (2020-01-30)

The following sections list the changes in ownCloud Design System 1.0.1.

[1.0.1]: https://github.com/owncloud/owncloud-design-system/compare/9c9d14acc7df90254e857e9c2de7bad8f77a238c...v1.0.1

## Summary

* Enhancement - Initial release: [#10](https://github.com/owncloud/owncloud-design-system/issues/10)

## Details

* Enhancement - Initial release: [#10](https://github.com/owncloud/owncloud-design-system/issues/10)

   We created the ownCloud Design System to provide developers with well documents and reusable
   vue.js components.

   https://github.com/owncloud/owncloud-design-system/issues/10
   https://owncloud.github.io/owncloud-design-system/

