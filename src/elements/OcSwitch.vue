<template>
  <div>
    <label class="switch">
      <input type="checkbox" @change="onChange" :checked="model" />
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
.switch {
  @include reset;
  @include stack-space($space-m);
  @include inline-space($space-xs);
  margin: #{$space-xs} #{$space-xs} #{$space-s} $space-xs/2;
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  & input {
    opacity: 0;
    width: 0;
    height: 0;
    &:checked + .slider {
      background-color: $color_oc_blue;
    }
    &:focus + .slider {
      box-shadow: 0 0 1px $color_oc_blue;
    }
    &:checked + .slider:before {
      transform: translateX(26px);
    }
  }
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  &:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }
  &.round {
    border-radius: 34px;
    &:before {
      border-radius: 50%;
    }
  }
}
</style>
<docs>
  ```jsx
  <div>
    <oc-switch />
  </div>
  ```
</docs>
