<template>
  <div :class="$_ocNotificationMessage_classes">
    <oc-icon :variation="status" size="large" name="info" class="uk-margin-small-right"></oc-icon>
    <div class="uk-flex uk-flex-wrap uk-flex-middle uk-flex-1 uk-margin-right">
      <div class="oc-notification-message-title">
        {{ title }}
      </div>
      <div v-if="message" class="uk-text-meta uk-width-1-1">
        {{ message }}
      </div>
    </div>
    <oc-icon
      :variation="status"
      name="close"
      class="uk-position-top-right uk-margin-small-top uk-margin-small-right oc-alert-close-icon"
      type="a"
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
     * The title that will be displayed in notification
     */
    title: {
      type: String,
      required: true,
    },
    /**
     * The message that will be displayed in notification
     */
    message: {
      type: String,
      required: false,
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
      return `uk-flex uk-flex-wrap uk-notification-message uk-notification-message-${this.status}`
    },
  },
}
</script>
<docs>
  Please have a look at the component [oc-notifications](#/Elements/oc-notifications) for example code.
</docs>
