<template>
  <div class="oc-app-side-bar">
    <div class="sidebar-container">
      <div class="header primary">
        <div v-if="!disableAction" class="action">
          <slot name="action">
            <oc-button
              icon="close"
              class="uk-float-right"
              :aria-label="closeButtonLabel"
              @click="$emit('close', $event)"
            ></oc-button>
          </slot>
        </div>
        <div class="sidebar-title">
          <slot name="title">
            <span class="uk-text-lead">Heading</span>
          </slot>
        </div>
      </div>
      <div class="content">
        <slot name="content"></slot>
      </div>
      <div class="footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * Create a sidebar with title, content and footer that includes a close button
 * in the corner.
 */
export default {
  name: "oc-app-side-bar",
  status: "prototype",
  release: "1.0.0",
  props: {
    disableAction: {
      default: false,
      type: Boolean,
    },
    closeButtonLabel: {
      default: "Close",
      type: String,
    },
  },
}
</script>

<docs>
```jsx
  <template>
    <oc-app-side-bar>
        <template slot="action">
          <oc-button icon="close" class="uk-float-right uk-margin-small-right"/>
        </template>
        <template slot="title">
          <span class="uk-text-lead">Title</span>
        </template>
        <template slot="content">
          Content
        </template>
        <template slot="footer">
          Footer
        </template>
    </oc-app-side-bar>
  </template>
  <script>
    export default {
    }
  </script>
```
</docs>
