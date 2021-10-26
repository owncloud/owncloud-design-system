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
 * Datepicker component based on [v-calendar](https://vcalendar.io/). For detailed documentation (props, slots, events, etc.), please visit https://vcalendar.io/api/v2.0/calendar.html
 */
export default {
  name: "OcDatepicker",
  status: "ready",
  release: "1.0.0",

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

<!-- <docs>
```vue
<template>
<div>
  <oc-datepicker v-model="date">
    <template #default="{ togglePopover }">
      <oc-button @click="togglePopover">Open datepicker</oc-button>
    </template>
  </oc-datepicker>
  <p v-if="date" v-text="date" />
</div>
</template>
<script>
export default {
  data: () => ({ date: null })
}
</script>
```
</docs> -->
