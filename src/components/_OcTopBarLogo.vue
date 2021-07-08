<template>
  <div class="uk-navbar-item uk-logo">
    <oc-button @click="onClick"
      ><oc-icon :name="icon" :accessible-label="accessibleLabel"
    /></oc-button>
    <span v-if="title" class="uk-navbar-item">{{ title }}</span>
  </div>
</template>

<script>
export default {
  name: "OcTopbarLogo",
  status: "deprecated",
  release: "1.0.0",
  props: {
    icon: {
      type: String,
      default: "menu",
    },
    title: {
      type: String,
      default: "",
    },
    accessibleLabel: {
      type: String,
      default: "",
    },
  },
  methods: {
    onClick() {
      /**
       * The onChange event
       * @event click
       * @type {event}
       */
      this.$emit("click")
    },
  },
}
</script>
