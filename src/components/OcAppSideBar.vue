<template>
  <div class="oc-app-side-bar">
    <div class="oc-app-side-bar-header oc-py-s">
      <div v-if="!disableAction" class="action">
        <slot name="action">
          <oc-button class="uk-float-right" :aria-label="closeButtonLabel" @click="$emit('close')">
            <oc-icon name="close" />
          </oc-button>
        </slot>
      </div>
      <div class="sidebar-title">
        <slot name="title">
          <span class="oc-text-lead">{{ headingText }}</span>
        </slot>
      </div>
    </div>
    <div class="content">
      <slot name="content" />
    </div>
    <div class="footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
/**
 * Create a sidebar with title, content and footer that includes a close button
 * in the corner.
 */
import OcIcon from "./OcIcon.vue"
import OcButton from "./OcButton.vue"

export default {
  name: "OcAppSideBar",
  status: "ready",
  release: "1.0.0",
  components: {
    OcButton,
    OcIcon,
  },
  props: {
    disableAction: {
      default: false,
      type: Boolean,
    },
    /**
     * Provide the accessible name for the close button, since it has no visible label
     * but a svg, to which to provide an accessible name would be more complicated.
     * Value of closeButtonLabel will eventually be the value of the button's aria-label
     **/
    closeButtonLabel: {
      default: "Close",
      type: String,
    },
    headingText: {
      default: "Heading",
      type: String,
    },
  },
}
</script>

<style>
.oc-app-side-bar {
  height: 100vh;
}

.oc-app-side-bar-header {
  background-color: var(--oc-color-background-default);
  position: sticky;
  top: 0px;
  z-index: 1;
}
</style>

<docs>
```js
<template>
  <oc-app-side-bar>
    <template slot="title">
      <span class="oc-text-lead">Title</span>
    </template>
    <template slot="content">
      Content
    </template>
    <template slot="footer">
      Footer
    </template>
  </oc-app-side-bar>
</template>
```
</docs>
