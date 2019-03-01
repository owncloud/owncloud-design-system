<template>
  <label class="radio-container">
    <span class="label">{{ label }}</span>
    <input type="radio" v-model="model" name="radio" :aria-label="label" @change="onChange" />
    <span class="checkmark"></span>
  </label>
</template>
<script>
export default {
  name: "oc-radio",
  status: "review",
  release: "1.0.0",
  props: {
    /**
     * Data-model
     *
     * @model
     **/
    model: {
      type: Object,
      required: false,
    },
    /**
     * Label of the Radio. Will set aria-label aswell.
     **/
    label: {
      type: String,
      default: null,
    },
  },
  methods: {
    onChange(val) {
      /**
       * The onChange event
       * @event change
       * @type {event}
       */
      this.$emit("change", val)
    },
  },
}
</script>
<style lang="scss" scoped>
/* The radio-container */
.radio-container {
  @include reset;
  @include stack-space($space-m);
  @include inline-space($space-xs);
  display: inline-flex;
  cursor: pointer;
  font-weight: $weight-semi-bold;
  font-size: $size-m;
  font-family: $font-text;
  line-height: $line-height-m;
  user-select: none;
  &.label {
  }
  & input {
    opacity: 0;
    cursor: pointer;
    &:checked ~ .checkmark {
      background-color: $color_oc_blue;
    }
    &:checked ~ .checkmark:after {
      display: block;
    }
  }
  &:hover input ~ .checkmark {
    background-color: $color_oc_blue_light;
  }
  &:focus input ~ .checkmark {
    box-shadow: 0 0 4px $color_oc_blue_lighter;
  }
}
/* Create a custom radio button */
.checkmark {
  position: relative;
  height: $size-l;
  width: $size-l;
  background-color: tint($color-silver, 50%);
  border-radius: $radius-circle;
  &:after {
    content: "";
    position: absolute;
    display: none;
    top: $size-l / 3;
    left: $size-l / 3;
    width: $size-l / 3;
    height: $size-l / 3;
    border-radius: $radius-circle;
    background: $color-white;
  }
}
</style>
<docs>
  ```jsx
  <div>
    <oc-radio label="Demo Label" />
  </div>
  ```
</docs>
