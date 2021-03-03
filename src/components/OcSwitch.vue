<template>
  <div class="oc-switch" :data-state="state" @click="toggle">
    <input ref="input" v-model="checked" type="checkbox" :aria-label="label" />
  </div>
</template>

<script>
/**
 * The switch has two states between users can choose.
 */
export default {
  name: "OcSwitch",
  status: "review",
  release: "1.0.0",
  model: {
    prop: "model",
    event: "change",
  },
  props: {
    /**
     * Default value can be `Boolean` or `Number`
     *
     * @model
     **/
    model: {
      required: false,
      default: false,
      type: [Boolean, Number],
    },
    /**
     * Accessible name of the switch via aria-label.
     **/
    label: {
      type: String,
      required: true,
      default: null,
    },
  },
  data() {
    return {
      checked: this.model,
    }
  },
  computed: {
    state() {
      return this.checked ? "on" : "off"
    },
  },
  watch: {
    checked: function (val) {
      /**
       * Change event
       * @event change
       * @type {boolean}
       */
      this.$emit("change", val)
    },
  },
  methods: {
    toggle() {
      this.checked = !this.checked
    },
  },
}
</script>

<docs>
  ```vue
  <template>
    <section>
      <h3>Switcher behavior</h3>
      <oc-switch label="Demo Label" @change="onChange" :model="state" />
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
      },
      methods: {
        onChange(val) {
          this.state = !this.state
        }
      }
    }
  </script>
  ```
</docs>
