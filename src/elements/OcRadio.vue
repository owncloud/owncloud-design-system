<template>
  <label class="radio-container">
    <input type="radio" v-model="model" name="radio" />
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
  },
}
</script>
<style lang="scss" scoped>
/* The radio-container */
.radio-container {
  display: block;
  position: relative;
  padding-left: 35px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  & input {
    position: absolute;
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
    background-color: #ccc;
  }
}
/* Create a custom radio button */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
  border-radius: 50%;
  &:after {
    content: "";
    position: absolute;
    display: none;
    top: 9px;
    left: 9px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: white;
  }
}
</style>
<docs>
  ```jsx
  <div>
    <oc-radio />
  </div>
  ```
</docs>
