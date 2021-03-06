<template>
  <span :key="`oc-switch-${checked.toString()}`" class="oc-switch">
    <span :id="labelId" v-text="label" />
    <button
      data-testid="oc-switch-btn"
      class="oc-switch-btn"
      role="switch"
      :aria-checked="checked.toString()"
      :aria-labelledby="labelId"
      @click="toggle"
    />
  </span>
</template>

<script>
import uniqueId from "../../utils/uniqueId"

/**
 * The switch has two states between users can choose.
 */
export default {
  name: "OcSwitch",
  status: "ready",
  release: "1.0.0",
  model: {
    prop: "checked",
    event: "change",
  },
  props: {
    /**
     * Value of the switch
     *
     * @model
     **/
    checked: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * Accessible name of the switch
     **/
    label: {
      type: String,
      required: true,
      default: null,
    },
    /**
     * ID of the label element
     * If not set, unique ID is used instead with format `oc-switch-label-{number}`
     */
    labelId: {
      type: String,
      required: false,
      default: uniqueId("oc-switch-label-"),
    },
  },

  methods: {
    toggle() {
      /**
       * Change event
       * @event change
       * @type {boolean}
       */
      this.$emit("change", !this.checked)
    },
  },
}
</script>

<style lang="scss">
.oc-switch {
  align-items: center;
  display: inline-flex;
  gap: var(--oc-space-small);

  &-btn {
    border: 0;
    border-radius: 20px;
    cursor: pointer;
    display: block;
    height: $form-radio-size;
    margin: 0;
    padding: 0;
    position: relative;
    transition: background-color 0.25s;
    width: $form-radio-size * 1.75;

    &::before {
      background-color: var(--oc-color-text-inverse);
      border-radius: 50%;
      content: "";
      height: $form-radio-size - 4;
      left: 1px;
      position: absolute;
      top: 2px;
      transition: transform 0.25s;
      width: $form-radio-size - 4;
    }

    &[aria-checked="false"] {
      background-color: var(--oc-color-text-muted);

      &::before {
        transform: translateX(0);
      }
    }

    &[aria-checked="true"] {
      background-color: var(--oc-color-swatch-brand-default);

      &::before {
        transform: translateX(calc(100% + 1px));
      }
    }
  }
}
</style>

<docs>
```vue
<template>
  <section>
    <h3>Switcher behavior</h3>
    <oc-switch label="Darkmode" v-model="state" />
    <p>
      The switch is turned <strong v-if="state">on</strong><strong v-else="state">off</strong>.
    </p>
  </section>
</template>
<script>
  export default {
    data: () => {
      return {
        state: true
      }
    }
  }
</script>
```
</docs>
