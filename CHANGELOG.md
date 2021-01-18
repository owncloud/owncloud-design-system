# Changelog for [unreleased] (UNRELEASED)

The following sections list the changes in ownCloud Design System unreleased.

[unreleased]: https://github.com/owncloud/owncloud-design-system/compare/v2.0.4...master

## Summary

* Change - Create new table component: [#1177](https://github.com/owncloud/ocis/issues/1177)
* Enhancement - Create new files table component: [#1177](https://github.com/owncloud/ocis/issues/1177)

## Details

* Change - Create new table component: [#1177](https://github.com/owncloud/ocis/issues/1177)

   We've dropped the table component and created a new one from scratch. The new component is
   defining its fields and data via props. To still use more "traditional" table, take a look at
   component `OcTableSimple`.

   https://github.com/owncloud/ocis/issues/1177
   https://github.com/owncloud/owncloud-design-system/pull/1034


* Enhancement - Create new files table component: [#1177](https://github.com/owncloud/ocis/issues/1177)

   We've built a new files table component which has a set of pre-defined fields. Which fields will
   be displayed depends on the provided resources. This component also wraps a few other
   components:

   - OcResource - OcAvatarGroup

   https://github.com/owncloud/ocis/issues/1177
   https://github.com/owncloud/owncloud-design-system/pull/1034

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

[1.15.0]: https://github.com/owncloud/owncloud-design-system/compare/v1.13.0...v1.15.0

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

# Changelog for [1.13.0] (2020-10-28)

The following sections list the changes in ownCloud Design System 1.13.0.

[1.13.0]: https://github.com/owncloud/owncloud-design-system/compare/v1.14.0...v1.13.0

## Summary

* Change - New accordion component implementation: [#911](https://github.com/owncloud/owncloud-design-system/pull/911)

## Details

* Change - New accordion component implementation: [#911](https://github.com/owncloud/owncloud-design-system/pull/911)

   We rewrote the accordion component to remove UIKit styles and align with our own styling. Some
   accessibility aspects are already implement, for example expanding and collapsing
   accordion items by pressing space or enter already works. More will come later on.

   https://github.com/owncloud/owncloud-design-system/pull/911

# Changelog for [1.14.0] (2020-10-28)

The following sections list the changes in ownCloud Design System 1.14.0.

[1.14.0]: https://github.com/owncloud/owncloud-design-system/compare/v1.12.2...v1.14.0

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

