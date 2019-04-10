<template>
  <div class="oc-switch" :data-state="state" @click="toggle">
    <input type="checkbox" :aria-label="label" :checked="checked" />
  </div>
</template>
<script>
/**
 * The switch has two states between users can choose.
 */
export default {
  name: "oc-switch",
  status: "review",
  release: "1.0.0",
  props: {
    /**
     * Default value can be `Boolean` or `String`
     *
     * @model
     **/

    model: {
      required: false,
      default: false,
      type: [Boolean, String],
    },
    /**
     * Label of the switch. Will set aria-label as well.
     **/
    label: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      checked: false,
    }
  },
  computed: {
    state() {
      return this.checked ? "on" : "off"
    },
  },
  watch: {
    checked: function(val) {
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
      <oc-switch label="Demo Label" @change="onChange" v-model="state"/>
      <br>
      <oc-star :shining="state"></oc-star>
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
          alert('Switcher changed the state')
        }
      }
    }

  </script>
  ```
</docs>
