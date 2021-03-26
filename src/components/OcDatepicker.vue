<template>
  <div>
    <label class="oc-label" :for="id" v-text="label" />
    <div class="uk-position-relative">
      <date-picker
        ref="datePicker"
        v-model="update"
        :masks="masks"
        class="oc-datepicker"
        :mode="type"
        :locale="lang"
        :min-date="minDatetime"
        :max-date="maxDatetime"
        color="gray"
        :is24hr="is24hr"
        role="dialog"
        :aria-label="popoverLabel"
        @input="input()"
        @popoverDidShow="popoverDidShow()"
        @popoverDidHide="popoverDidHide()"
      >
        <template #default="{ inputValue, togglePopover }">
          <input
            :id="id"
            :ref="id"
            v-bind="additionalAttributes"
            class="oc-datepicker-input"
            :value="inputValue"
            readonly
            @focus="togglePopover()"
          />
        </template>
      </date-picker>
      <oc-button
        v-if="update"
        :aria-label="$gettext('Clear date')"
        class="oc-datepicker-clear uk-position-small uk-position-center-right"
        appearance="raw"
        @click="update = null"
      >
        <oc-icon name="close" size="small" />
      </oc-button>
    </div>
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
import DatePicker from "v-calendar/lib/components/date-picker.umd"
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
  /**
   * Component names should be short, pronounceable and Capitalized.
   */
  name: "OcDatepicker",
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
  components: {
    DatePicker,
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
    /**
     * Provide a locale.
     * `ISO-3166` or `ISO-639` string
     */
    lang: {
      type: String,
      default: "en",
    },
    /**
     * Provide a format to display dates within the input.
     * Currently only supports dates as time will be automatically formatted based on `is24hr`.
     */
    dateFormat: {
      type: String,
      default: "DD. MMMM YYYY",
    },
    /**
     * Use this property to use 24hr mode.
     */
    is24hr: {
      type: Boolean,
      default: null,
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
     * Label of the input field.
     **/
    label: {
      type: String,
      required: true,
      default: null,
    },
    /**
     * Label of the datepicker modal.
     **/
    popoverLabel: {
      type: String,
      default: "Pick a date",
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
      masks: {
        input: this.dateFormat,
        inputDateTime: `${this.dateFormat}, h:mm A`,
        inputDateTime24hr: `${this.dateFormat}, HH:mm`,
      },
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
    popoverDidShow() {
      console.log(this.$refs.datePicker)
      const overlay = this.$refs.datePicker.$children[0].$el
      overlay.setAttribute("aria-hidden", "false")
    },
    popoverDidHide() {
      const overlay = this.$refs.datePicker.$children[0].$el
      overlay.setAttribute("aria-hidden", "true")
    },
  },
}
</script>

<style lang="scss">
.oc-datepicker {
  &-input {
    @extend .uk-input;

    background-color: var(--oc-color-input-bg);
    border: 1px solid var(--oc-color-input-border);
    border-radius: 3px;
    color: var(--oc-color-text-default);

    &:focus {
      background-color: var(--oc-color-input-bg);
      border-color: var(--oc-color-swatch-brand-default);
      color: var(--oc-color-text-default);
    }
  }

  &-description,
  &-description:focus {
    border-color: var(--oc-color-text-muted);
    color: var(--oc-color-text-muted);
  }

  &-message {
    @extend .uk-flex;
    @extend .uk-flex-middle;
    @extend .oc-mt-xs;

    min-height: $global-font-size * 1.5;
  }
}
</style>

<docs>
```vue
  <template>
    <div>
      <div class="oc-m">
        <h3 class="uk-heading-divider">
          Datepicker inputs
        </h3>
        <oc-datepicker class="oc-mb-s" label="Default datepicker"></oc-datepicker>
        <oc-datepicker class="oc-mb-s" label="Datepicker with a minimum date" title="I have a minimum date" type="datetime" :minDatetime="minDatetime"></oc-datepicker>
      </div>
      <div class="oc-m">
        <h3 class="uk-heading-divider">
          Messages
        </h3>
        <oc-datepicker
            label="Datepicker with description message below"
            class="oc-mb-s"
            description-message="This is a description message."
        ></oc-datepicker>
      </div>
    </div>
    <div class="oc-m">
      <h3 class="uk-heading-divider">
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
