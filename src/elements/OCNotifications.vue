<template>
  <div :class="$_ocNotifications_classes">
    <slot></slot>
  </div>
</template>
<script>
import OcButton from "./OcButton"
/**
 * Notifications are used to inform users about errors, warnings and as confirmations for their actions.
 *
 * The default slot can be filled with [oc-notification-message](#/Elements/oc-notification-message) elements
 */
export default {
  name: "oc-notifications",
  components: { OcButton },
  status: "review",
  release: "1.0.0",
  props: {
    /**
     * Position of the notifications.
     * Valid values are: `top-left, top-center and top-right`
     */
    position: {
      type: String,
      required: false,
      default: "top-center",
      validator: value => {
        return value.match(/(top-left|top-center|top-right)/)
      },
    },
  },
  computed: {
    $_ocNotifications_classes() {
      return `uk-notification uk-notification-${this.position}`
    },
  },
}
</script>
<docs>
```vue
  <template>
    <section>
      <h3 class="uk-heading-divider">
        Notifications examples
      </h3>

      <oc-button text="Show center notifications" @click="show('center')"></oc-button>
      <oc-notifications position="top-center">
        <oc-notification-message
                v-for="(item, index) in messages.center"
                :key="index"
                :message="item.message"
                :status="item.status"
                @close="removeNotification('center', item)"
        />
      </oc-notifications>
      <oc-button text="Show right notifications" @click="show('right')"></oc-button>
      <oc-notifications position="top-right">
        <oc-notification-message
                v-for="(item, index) in messages.right"
                :key="index"
                :message="item.message"
                :status="item.status"
                @close="removeNotification('right', item)"
        />
      </oc-notifications>
    </section>
  </template>
  <script>
    export default {
      data: () => {
        return {
          messages: {
            left: [],
            center: [],
            right: []
          }
        }
      },
      methods: {
        removeNotification(position, item) {
          this.messages[position] = this.messages[position].filter(el => el !== item);
        },
        show(position) {
          this.messages[position] = [
            {
              message: 'How are you today?',
              status: 'primary'
            },
            {
              message: 'Are you sure?',
              status: 'warning'
            },
            {
              message: 'Just another day in paradise',
              status: 'success'
            },
            {
              message: 'Holy Shoot. Something broke',
              status: 'danger'
            },
          ]
        }
      }
    }
  </script>
```
</docs>
