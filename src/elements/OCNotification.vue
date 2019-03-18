<template>
  <button class="uk-button uk-button-primary" @click="_notify">
    <slot>Alert Me</slot>
  </button>
</template>
<script>
import UiKit from "uikit"

/**
 * Notifications are used to inform users about errors, warnings and as confirmations for their actions.
 */
export default {
  name: "oc-notification",
  status: "review",
  release: "1.0.0",
  props: {
    /**
     * Notifications can have one of the four kinds: primary, success, warning and danger
     * The status defines the color of the notification.
     */
    status: {
      type: String,
      required: false,
      default: null,
      validator: value => {
        return value.match(/(primary|success|warning|danger)/)
      },
    },
    /**
     * The message which is given to the user in the notification.
     */
    message: {
      type: String,
      required: true,
    },
  },
  methods: {
    _notify() {
      UiKit.notification({
        status: this.status,
        message: this.message,
      })
    },
  },
}
</script>
<docs>
```jsx
<div>
  <oc-notification status="primary" message="How are you today?">Hey!</oc-notification>
  <oc-notification status="secondary" message="Just another day in paradise!">What's up?</oc-notification>
  <oc-notification status="warning" message="Are you sure?">Delete</oc-notification>
  <oc-notification status="danger" message="Holy Shoot. Someting broke">Alert Me</oc-notification>
</div>
```
</docs>
