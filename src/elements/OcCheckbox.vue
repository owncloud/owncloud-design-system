<template>
  <input type="checkbox" v-model="model" @change="onChange" class="uk-checkbox" />
</template>
<script>
export default {
  name: "oc-checkbox",
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
     * Label of the Checkbox. Will set aria-label aswell
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
.container {
  @include reset;
  @include stack-space($space-m);
  @include inline-space($space-xs);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: $weight-semi-bold;
  font-size: $size-m;
  font-family: $font-text;
  line-height: $line-height-m;
  user-select: none;
  & input {
    position: relative;
    opacity: 0;
    height: 0;
    width: 0;
    &:checked ~ .checkmark {
      background-color: $color_oc_blue;
    }
    &:checked ~ .checkmark:after {
      display: block;
    }
  }
  &:hover input ~ .checkmark {
    background-color: $color_oc_blue_light;
    &:after {
      position: relative;
      border: solid $color-white;
      border-width: 0 3px 3px 0;
      transform: rotate(45deg);
    }
  }
}
.checkmark {
  position: relative;
  border-radius: $radius-default;
  float: right;
  height: $size-l;
  width: $size-l;
  background-color: tint($color-silver, 50%);
  will-change: transform;
  transition: all 0.2s ease;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  &:after {
    content: "";
    display: none;
    position: absolute;
    top: $size-xs/4;
    left: $size-xs/1.5;
    width: $size-xs/2;
    height: $size-xs;
    border: solid $color-white;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
  }
}
</style>
<docs>
  ```jsx
  <div>
    <oc-checkbox label="Test Label" />
  </div>
  ```
</docs>
