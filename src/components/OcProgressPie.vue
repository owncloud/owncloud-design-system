<template>
  <div class="oc-progress-pie" :data-fill="_fill">
    <div class="oc-progress-pie-container"></div>
    <label v-if="showLabel" class="oc-progress-pie-label" v-text="_label" />
  </div>
</template>
<script>
/**
 * Show progress to the users in a pie shape.
 */
export default {
  name: "OcProgressPie",
  status: "ready",
  release: "1.0.0",
  props: {
    /**
     * Current value of the progress
     */
    progress: {
      type: Number,
      default: 0,
      required: true,
      validator: value => {
        return value >= 0 && value <= 100
      },
    },
    /**
     * Maximum value.
     */
    max: {
      type: Number,
      default: 100,
    },
    /**
     * Defines if the label shall be shown.
     */
    showLabel: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    _fill() {
      return Math.round((100 / this.max) * this.progress)
    },
    _label() {
      if (this.max === 100) return this.progress + "%"
      else return `${this.progress}/${this.max}`
    },
  },
}
</script>
<docs>
```js
<div class="uk-flex uk-flex-middle">
  <section>
    <h3 class="oc-heading-divider">
      Pie shape progress
    </h3>
    <oc-progress-pie :progress="33" />
    <oc-progress-pie :progress="33" show-label/>
    <oc-progress-pie :progress="2" :max="4" />
    <oc-progress-pie :progress="4" :max="6" show-label />
  </section>
</div>
```
</docs>
