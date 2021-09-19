<template>
  <date-picker class="oc-datepicker" v-bind="$attrs" v-on="$listeners">
    <template #default="{ inputValue, togglePopover, hidePopover }">
      <!-- @slot Default slot to use as the popover anchor for datepicker -->
      <slot :inputValue="inputValue" :togglePopover="togglePopover" :hidePopover="hidePopover" />
    </template>
  </date-picker>
</template>

<script>
import DatePicker from "v-calendar/lib/components/date-picker.umd"

/**
 * Datepicker component based on [v-calendar](https://vcalendar.io/)
 */
export default {
  name: "OcDatePicker",
  status: "review",
  release: "unreleased",

  components: { DatePicker },

  inheritAttrs: true,
}
</script>

<style lang="scss">
.oc-datepicker .vc-highlight {
  // `!important` to overwrite the inline style
  background-color: var(--oc-color-swatch-primary-default) !important;
}
</style>

<docs>
```vue
<template>
<div>
  <oc-date-picker v-model="date">
    <template #default="{ togglePopover }">
      <oc-button @click="togglePopover">Open datepicker</oc-button>
    </template>
  </oc-date-picker>
  <p v-if="date" v-text="date" />
</div>
</template>
<script>
export default {
  data: () => ({ date: null })
}
</script>
```
</docs>
