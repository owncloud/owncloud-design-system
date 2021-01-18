<template>
  <div class="uk-navbar-item uk-logo">
    <oc-button @click="$_ocTopBarLogo_click"><oc-icon :name="icon" /></oc-button>
    <span v-if="title" class="uk-navbar-item">{{ title }}</span>
  </div>
</template>

<script>
export default {
  name: "OcTopbarLogo",
  status: "review",
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
  },
  methods: {
    $_ocTopBarLogo_click() {
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
