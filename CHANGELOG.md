# Changelog for [unreleased] (UNRELEASED)

The following sections list the changes in ownCloud Design System unreleased.

[unreleased]: https://github.com/owncloud/owncloud-design-system/compare/v1.6.0...master

## Summary

* Enhancement - Automatically focus modal: [#781](https://github.com/owncloud/owncloud-design-system/pull/781)

## Details

* Enhancement - Automatically focus modal: [#781](https://github.com/owncloud/owncloud-design-system/pull/781)

   When the modal is mounted, it receives automatically a focus. The focus is sent directly to the
   modal itself so skipping the wrapping div which works only as a background.

   https://github.com/owncloud/owncloud-design-system/pull/781

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

