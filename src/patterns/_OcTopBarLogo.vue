<template>
  <div class="uk-navbar-item uk-logo">
    <oc-icon :name="icon"></oc-icon>
    <span v-if="title" class="uk-navbar-item">{{ title }}</span>
  </div>
</template>

<script>
export default {
  name: "oc-topbar-logo",
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
}
</script>
