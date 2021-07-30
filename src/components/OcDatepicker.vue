<template>
  <div>
    <label class="oc-label" :for="id" v-text="label" />
    <datetime
      v-model="update"
      :input-id="id"
      v-bind="additionalAttributes"
      class="oc-datepicker"
      :title="title"
      :type="type"
      :phrases="phrases"
      :min-datetime="minDatetime"
      :max-datetime="maxDatetime"
      @cancel="cancel()"
      @input="input()"
    ></datetime>
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
import { Datetime } from "vue-datetime"
import uniqueId from "../utils/uniqueId"

/**
 * Datepicker inputs are used to select a date from a calendar.
 *
 * ## Accessibility
 * The label is required and represents the name of the datepicker.
 *
 * The description-message can be used additionally to give further information about the datepicker. When a description is given, it will be automatically referenced via the `aria-describedby` property.
 */
export default {
  name: "OcDatepicker",
  status: "prototype",
  release: "1.0.0",
  components: {
    Datetime,
  },
  /**
   * Prop definitions should be as detailed as possible, specifying at least
   * type(s). See examples below:
   */
  props: {
    id: {
      type: String,
      required: false,
      default: () => uniqueId("oc-datepicker-"),
    },
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
     * Minimum datetime.
     * `ISO 8601 String`
     */
    minDatetime: {
      type: [Object, String],
      default: null,
    },
    /**
     * Maximum datetime.
     * `ISO 8601 String`
     */
    maxDatetime: {
      type: [Object, String],
      default: null,
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
  },
  data() {
    return {
      party: true,
      update: this.date,
    }
  },
  computed: {
    descriptionId() {
      return `${this.id}-description`
    },
    additionalAttributes() {
      const additionalAttrs = {}
      if (this.descriptionMessage) {
        additionalAttrs["aria-describedby"] = this.descriptionId
      }
      return { ...this.$attrs, ...additionalAttrs }
    },
  },
  methods: {
    input() {
      this.$emit("input", this.update)
    },
    cancel() {
      this.$emit("cancel")
    },
  },
}
</script>

<docs>
```js
<template>
  <div>
    <div class="oc-m">
      <h3 class="oc-heading-divider">
        Datepicker inputs
      </h3>
      <oc-datepicker label="Default datepicker"></oc-datepicker>
      <oc-datepicker label="Datepicker with a minimum date" title="I have a minimum date" type="datetime"
                     :minDatetime="minDatetime"></oc-datepicker>
    </div>
    <div class="oc-m">
      <h3 class="oc-heading-divider">
        Messages
      </h3>
      <oc-datepicker
        label="Datepicker with description message below"
        class="oc-mb-s"
        description-message="This is a description message."
      ></oc-datepicker>
    </div>
  </div>
</template>
<script>
  import { DateTime } from "luxon";

  export default {
    data: () => {
      window.DateTime = DateTime;
      return {
        minDatetime: DateTime.local().toISO()
      };
    }
  };
</script>
```
</docs>
