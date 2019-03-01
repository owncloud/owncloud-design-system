<template>
  <div class="container">
    <span class="label">{{ label }}</span>
    <label class="switch">
      <input type="checkbox" @change="onChange" :aria-label="label" :checked="model" />
      <span class="slider round"></span>
    </label>
  </div>
</template>
<script>
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
      type: [Boolean, String],
    },
    /**
     * Label of the Switch. Will set aria-label aswell.
     **/
    label: {
      type: String,
      default: null,
    },
  },
  methods: {
    onChange(val) {
      /**
       * Change event
       * @event change
       * @type {boolean}
       */
      this.$emit("change", this.val)
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
  font-weight: $weight-semi-bold;
  font-size: $size-m;
  font-family: $font-text;
  line-height: $line-height-m;
  .switch {
    position: relative;
    display: inline-block;
    width: $size-xxxl;
    height: $size-xxxl / 2;
    & input {
      opacity: 0;
      width: 0;
      height: 0;
      &:checked + .slider {
        background-color: $color_oc_blue;
      }
      &:focus + .slider {
        box-shadow: 0 0 4px $color_oc_blue_lighter;
      }
      &:checked + .slider:before {
        transform: translateX(26px);
      }
    }
  }

  .label {
    margin-right: $size-xs / 2;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.4s;
    &:before {
      position: absolute;
      content: "";
      height: $size-m;
      width: $size-m;
      left: $size-s / 6;
      top: $size-s / 7;
      background-color: $color-white;
      transition: 0.4s;
    }
    &.round {
      border-radius: $radius-large;
      &:before {
        border-radius: $radius-circle;
      }
    }
  }
}
</style>
<docs>
  ```jsx
  <div>
    <oc-switch label="Demo Label" />
  </div>
  ```
</docs>
