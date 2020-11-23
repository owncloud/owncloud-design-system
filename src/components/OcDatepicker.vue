<template>
  <datetime
    v-model="update"
    class="oc-datepicker"
    :title="title"
    :type="type"
    :phrases="phrases"
    :min-datetime="minDatetime"
    :max-datetime="maxDatetime"
    :placeholder="placeholder"
    @cancel="$_cancel()"
    @input="$_input()"
  ></datetime>
</template>

<script>
import { Datetime } from "vue-datetime"
import moment from "moment"

/**
 * Example component is used to visually communicate core parts of the product
 * and available actions.
 */
export default {
  /**
   * Component names should be short, pronounceable and Capitalized.
   */
  name: "oc-datepicker",
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
    /**
     * The html element name used for the container of Example component.
     */
    date: {
      type: String,
      default: moment().format(),
    },
    /**
     * The placeholder value for the form input field.
     */
    placeholder: {
      type: String,
      default: null,
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
  },
  components: {
    Datetime,
  },
  data() {
    return {
      party: true,
      update: this.date,
    }
  },
  methods: {
    $_input() {
      this.$emit("input", this.update)
    },
    $_cancel() {
      this.$emit("cancel")
    },
  },
}
</script>

<style lang="css">
/**
 * Styles in a top-level App component and in layout components may be global,
 * but all other components should always be scoped (using either scoped
 * attribute or class based scoping).
 */

[data-preview="oc-datepicker"] .vdatetime-popup {
  z-index: 9999;
}
</style>

<docs>
```vue
  <template>
    <div>
      <div class="oc-m">
        <h3 class="uk-heading-divider">
          Default picker
        </h3>
        <oc-datepicker></oc-datepicker>
      </div>
      <div class="oc-m">
        <h3 class="uk-heading-divider">
          Datetime picker with a minimum date
        </h3>
        <oc-datepicker title="I have a minimum date" type="datetime" :minDatetime="minDatetime"></oc-datepicker>
      </div>
    </div>
  </template>
  <script>
    import moment from 'moment';
    export default {
      data: () => {
        return {
          minDatetime : moment().day(-3).format()
        }
      }
    }
  </script>
```
</docs>
