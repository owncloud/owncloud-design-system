<template>
  <div>
    <div class="container">
      <input type="checkbox" :checked="model" @change="onChange" />
      <span class="checkmark"></span>
    </div>
  </div>
</template>
<script>
export default {
  name: "oc-checkbox",
  status: "prototype",
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
  },
  methods: {
    onChange(val) {
      /**
       * Change event
       * @event change
       * @type {boolean}
       */
      this.$emit("change", val)
    },
  },
}
</script>
<style lang="scss" scoped>
.container {
  display: inline-block;
  position: relative;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  user-select: none;
  & input {
    position: relative;
    opacity: 0;
    cursor: pointer;
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
    background-color: $color_oc_blue;
    &:after {
      position: absolute;
      left: 9px;
      top: 5px;
      width: 5px;
      height: 10px;
      border: solid white;
      border-width: 0 3px 3px 0;
      transform: rotate(45deg);
    }
  }
}

.checkmark {
  position: relative;
  float: right;
  height: 25px;
  width: 25px;
  background-color: #eee;
  &:after {
    content: "";
    position: absolute;
    display: none;
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
  }
}
</style>
<docs>
  ```jsx
  <div>
    <oc-checkbox />
  </div>
  ```
</docs>
