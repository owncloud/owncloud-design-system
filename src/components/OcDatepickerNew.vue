<template>
  <div>
    <label :for="identifier" class="oc-label" v-text="label" />
    <duet-date-picker
      :id="identifier"
      class="oc-datepicker"
      :direction="direction"
      :disabled="disabled"
      :max="max"
      :min="min"
      :name="name"
      :role="role"
      :required="required"
      :value="value"
    ></duet-date-picker>
    <div v-if="!!descriptionMessage" class="oc-datepicker-message">
      <span
        :id="descriptionId"
        class="oc-datepicker-description"
        v-text="descriptionMessage"
      ></span>
    </div>
  </div>
</template>

<script>
import { defineCustomElements } from "@duetds/date-picker/dist/loader"
import uniqueId from "../utils/uniqueId"

// TODO: According to the documentation this should make it work, but it's throwing the following error:
// ! Uncaught TypeError: Cannot read properties of undefined (reading 'config')
// Documentation: https://yarnpkg.com/package/@duetds/date-picker#usage-with-vuejs

// Register Duet Date Picker
defineCustomElements(window)

/**
 * Datepicker inputs are used to select a date from a calendar.
 *
 * ## Accessibility
 * The label is required and represents the name of the datepicker.
 *
 * The description-message can be used additionally to give further information about the datepicker. When a description is given, it will be automatically referenced via the `aria-describedby` property.
 */
export default {
  /**
   * Component names should be short, pronounceable and Capitalized.
   */
  name: "OcDatepickerNew",
  /**
   * Components in the system are labelled with status labels that reflect their
   * state of completion. See example below. All available statuses are:
   *
   * STATUS:        COLOR:     DESCRIPTION:
   *
   * deprecated     Red        Component is deprecated
   * prototype      Blue       Prototype, do not implement!
   * under-review   Yellow     Component is currently being reviewed
   * ready          Green      Ready to be used
   */
  status: "prototype",
  /**
   * Release indicates when this component was added into the system.
   * (in which design system version)
   */
  release: "1.0.0",
  /**
   * Prop definitions should be as detailed as possible, specifying at least
   * type(s). See examples below:
   */
  props: {
    // id: {
    //   type: String,
    //   required: false,
    //   default: () => uniqueId("oc-datepicker-"),
    // },
    /**
     * The html element name used for the container of Example component.
     */
    date: {
      type: String,
      default: new Date().toISOString(),
    },
    /**
     * Popup title.
     */
    title: {
      type: String,
      default: "",
    },
    /**
     * Picker type.
     * `date, datetime, time`
     */
    type: {
      type: String,
      default: "date",
      validator: date => {
        return date.match(/(date|datetime|time)/)
      },
    },
    phrases: {
      type: Object,
      default: () => {
        return { ok: "Ok", cancel: "Cancel" }
      },
      validator: value => {
        return typeof value.ok === "string" || typeof value.cancel === "string"
      },
    },
    /**
     * Label of the datepicker.
     **/
    label: {
      type: String,
      required: true,
      default: null,
    },
    /**
     * A description text which is shown below the datepicker.
     */
    descriptionMessage: {
      type: String,
      default: null,
    },
    //
    // NEW PARAMETERS:
    //
    /**
     * Forces the opening direction of the calendar modal to be always left or right. This setting can be useful when the input is smaller than the opening date picker would be as by default the picker always opens towards right.
     */
    direction: {
      type: String,
      required: false,
      default: "right",
    },
    /**
     * Makes the date picker input component disabled. This prevents users from being able to interact with the input, and conveys its inactive state to assistive technologies.
     */
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * Adds a unique identifier for the date picker input. Use this instead of html `id` attribute.
     */
    identifier: {
      type: String,
      required: false,
      default: () => uniqueId("oc-datepicker-"),
    },
    /**
     * Maximum date allowed to be picked. Must be in IS0-8601 format: YYYY-MM-DD. This setting can be used alone or together with the min property.
     */
    max: {
      type: String,
      required: false,
      default: "",
    },
    /**
     * Minimum date allowed to be picked. Must be in IS0-8601 format: YYYY-MM-DD. This setting can be used alone or together with the max property.
     */
    min: {
      type: String,
      required: false,
      default: "",
    },
    /**
     * Name of the date picker input.
     */
    name: {
      type: String,
      required: false,
      default: "date",
    },
    /**
     * Defines a specific role attribute for the date picker input.
     */
    role: {
      type: String,
      required: false,
      default: "undefined",
    },
    /**
     * Should the input be marked as required?
     */
    required: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * Date value. Must be in IS0-8601 format: YYYY-MM-DD.
     */
    value: {
      type: String,
      required: false,
      default: "",
    },
  },
  data() {
    return {
      // party: true,
      // update: this.date,
    }
  },
  computed: {
    // descriptionId() {
    //   return `${this.id}-description`
    // },
    // additionalAttributes() {
    //   const additionalAttrs = {}
    //   if (this.descriptionMessage) {
    //     additionalAttrs["aria-describedby"] = this.descriptionId
    //   }
    //   return { ...this.$attrs, ...additionalAttrs }
    // },
  },
  methods: {
    // input() {
    //   this.$emit("input", this.update)
    // },
    // cancel() {
    //   this.$emit("cancel")
    // },
  },
}
</script>

<docs>
```js
<template>
  <div>
    <div class="oc-m">
      <h3 class="oc-heading-divider">
        BRAND NEW!!! 🔥🔥🔥 Datepicker inputs
      </h3>
      <oc-datepicker-new identifier="date" label="Choose a date" />
    </div>
  </div>
</template>
```
</docs>
