<template>
  <button class="uk-button uk-button-primary" @click="_notify">Alert Me</button>
</template>
<script>
import UiKit from "uikit"
export default {
  name: "oc-notification",
  status: "review",
  release: "1.0.0",
  props: {
    status: {
      type: String,
      required: false,
      default: null,
      validator: value => {
        return value.match(/(primary|success|warning|danger)/)
      },
    },
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
  <oc-notification status="danger" message="Holy Shoot. Someting broke">Alert Me</oc-notification>
</div>
```
</docs>
