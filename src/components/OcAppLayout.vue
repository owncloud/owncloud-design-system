<template>
  <div class="uk-grid-collapse" uk-grid>
    <div class="uk-width-1-5" :hidden="leftHidden">
      <slot name="left"></slot>
    </div>
    <div class="uk-width-expand uk-overflow-hidden">
      <slot name="center"></slot>
    </div>
    <div class="uk-width-1-5" :hidden="rightHidden">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "oc-app-layout",
  components: {},
  status: "review",
  release: "1.0.0",
  props: {
    leftHidden: {
      type: Boolean,
      required: false,
      default: true,
    },
    rightHidden: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
}
</script>

<docs>
  ```jsx
  <template>
    <div>
      <oc-app-layout :leftHidden="leftHidden" :rightHidden="rightHidden">
        <template slot="left">
          <oc-button @click="leftHidden=true">close</oc-button>
        </template>
        <template slot="center">
        Center
          <oc-button @click="leftHidden=false">show left</oc-button>
          <oc-button @click="rightHidden=false">show right</oc-button>
        </template>
        <template slot="right">
          <oc-button @click="rightHidden=true">close</oc-button>
        </template>
      </oc-app-layout>
    </div>
  </template>
  <script>
    export default {
      data () {
        return {
          leftHidden:  true,
          rightHidden: true,
        }
      }
    }
  </script>

  ```
</docs>
