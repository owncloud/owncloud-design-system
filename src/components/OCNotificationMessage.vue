<template>
  <div class="oc-alert" :class="$_ocNotificationMessage_classes">
    <oc-icon
      :variation="$_ocNotificationMessage_iconVariation"
      size="large"
      name="info"
      class="oc-mr-s"
    />
    <div
      class="uk-flex uk-flex-wrap uk-flex-middle uk-flex-1 oc-mr"
      :role="status === 'danger' ? 'alert' : 'status'"
      :aria-live="status === 'danger' ? 'assertive' : 'polite'"
    >
      <div class="oc-notification-message-title">
        {{ title }}
      </div>
      <div v-if="message" class="oc-text-muted uk-width-1-1">
        {{ message }}
      </div>
    </div>
    <oc-button
      name="close"
      appearance="raw"
      :variation="$_ocNotificationMessage_iconVariation"
      :aria-label="$gettext('Close notification')"
      class="uk-position-top-right oc-mt-s oc-mr-s"
      @click="$_ocNotificationMessage_close"
    >
      <oc-icon name="close" :variation="$_ocNotificationMessage_iconVariation" />
    </oc-button>
  </div>
</template>
<script>
/**
 * Notifications are used to inform users about errors, warnings and as confirmations for their actions.
 */
export default {
  name: "OcNotificationMessage",
  status: "review",
  release: "1.0.0",
  props: {
    /**
     * Notification messages are sub components of the oc-notifications component.
     * Messages can have one of the five states: `passive, primary, success, warning and danger`
     *
     * The status defines the color of the notification.
     */
    status: {
      type: String,
      required: false,
      default: "passive",
      validator: value => {
        return value.match(/(passive|primary|success|warning|danger)/)
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
      default: null,
    },
  },
  computed: {
    $_ocNotificationMessage_classes() {
      return `uk-flex uk-flex-wrap uk-notification-message uk-notification-message-${this.status}`
    },
    $_ocNotificationMessage_iconVariation() {
      return this.status
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
}
</script>

<style lang="scss">
// TODO: Refactor after removal of uikit
.uk-notification-message {
  &-passive {
    color: var(--oc-color-swatch-passive-default) !important;
  }
  &-primary {
    color: var(--oc-color-swatch-primary-default) !important;
  }
  &-success {
    color: var(--oc-color-swatch-success-default) !important;
  }
  &-warning {
    color: var(--oc-color-swatch-warning-default) !important;
  }
  &-danger {
    color: var(--oc-color-swatch-danger-default) !important;
  }
}
</style>

<docs>
  Please have a look at the component [oc-notifications](#/oC%20Components/oc-notifications) for example code.
</docs>
