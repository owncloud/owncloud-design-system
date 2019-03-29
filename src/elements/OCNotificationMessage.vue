<template>
  <div :class="$_ocNotificationMessage_classes">
    <oc-icon :variation="status" name="info"></oc-icon>
    <div>{{ message }}</div>
    <oc-icon
      :variation="status"
      name="close"
      class="uk-position-center-right"
      @click="$_ocNotificationMessage_close"
    ></oc-icon>
  </div>
</template>
<script>
/**
 * Notifications are used to inform users about errors, warnings and as confirmations for their actions.
 */
export default {
  name: "oc-notification-message",
  status: "review",
  release: "1.0.0",
  props: {
    /**
     * Notification messages are sub components of the oc-notifications component.
     * Messages can have one of the four states: `primary, success, warning and danger`
     *
     * The status defines the color of the notification.
     */
    status: {
      type: String,
      required: false,
      default: "primary",
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
    $_ocNotificationMessage_close() {
      /**
       * The close event is emitted when the user clicks the close icon.
       * @type {void}
       */
      this.$emit("close")
    },
  },
  computed: {
    $_ocNotificationMessage_classes() {
      return `uk-flex uk-notification-message uk-notification-message-${this.status}`
    },
  },
}
</script>
<docs>
  Please have a look at the component [oc-notifications](#/Elements/oc-notifications) for example code.
</docs>
