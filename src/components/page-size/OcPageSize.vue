<template>
  <label class="oc-page-size">
    <span class="oc-page-size-label" data-testid="oc-page-size-label" v-text="label" />
    <oc-select
      class="oc-page-size-select"
      data-testid="oc-page-size-select"
      :value="selected"
      :options="options"
      :clearable="false"
      :searchable="false"
      @input="emitChange"
    />
  </label>
</template>

<script>
import OcSelect from "../OcSelect.vue"

/**
 * Select how many items will be displayed per page
 */
export default {
  name: "OcPageSize",
  status: "review",
  release: "unreleased",

  components: { OcSelect },

  model: {
    prop: "selected",
    event: "change",
  },

  props: {
    /**
     * All possible sizes that the user can pick from
     */
    options: {
      type: Array,
      required: true,
    },

    /**
     * Label of the select
     */
    label: {
      type: String,
      required: true,
    },

    /**
     * Selected size
     * @model
     */
    selected: {
      type: [String, Number],
      required: true,
    },
  },

  methods: {
    emitChange(value) {
      /**
       * Triggers when the a value is selected
       *
       * @event change
       * @property {number|string} value selected value
       */
      this.$emit("change", value)
    },
  },
}
</script>

<style lang="scss">
.oc-page-size {
  align-items: center;
  display: flex;
  gap: var(--oc-space-xsmall);

  &-select,
  &-select .vs__dropdown-menu {
    min-width: var(--oc-size-width-xsmall);
  }
}
</style>

<docs>
```vue
<template>
  <div>
    <oc-page-size v-model="selected" label="Items per page" :options="[100, 500, 1000, 'All']" />
    Selected: {{ selected }}
  </div>
</template>
<script>
  export default {
    data: () => ({
      selected: 100,
    })
  }
</script>
```
</docs>
