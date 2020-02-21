<template>
  <div :id="name" class="uk-width-medium">
    <nav class="uk-offcanvas-bar uk-background-muted uk-width-medium uk-padding-small">
      <button class="uk-offcanvas-close" type="button" @click="onClose" uk-close />
      <ul class="oc-main-menu" uk-nav="multiple: true">
        <slot name="default" />
      </ul>
    </nav>
  </div>
</template>
<script>
import UiKit from "uikit"

/**
 * ## ToDo:
 *
 * - [ ] Fix documentation of this component
 *
 */
export default {
  name: "oc-application-menu",
  status: "prototype",
  release: "1.0.0",
  props: {
    /**
     * Data-model
     **/
    value: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * Id or Name of the Menu. Used to reference for open.
     */
    name: {
      type: String,
      required: true,
    },
    /**
     * Title of the dialog.
     *
     */
    title: {
      type: String,
      required: false,
    },
  },
  methods: {
    onClose() {
      /**
       * Close event
       * @event close
       * @type {event}
       */
      this.$emit("close")
    },
  },
  watch: {
    value: function(valNew) {
      if (valNew) {
        UiKit.offcanvas(`#${this.name}`, {
          mode: "slide",
          bgClose: false,
          escClose: false
        }).show()
      } else {
        UiKit.offcanvas(`#${this.name}`).hide()
      }
    },
  },
}
</script>
<docs>
  ```jsx
  <template>
    <div>
      <oc-button variation="primary" @click="isOpen = true">Open</oc-button>
      <oc-application-menu v-model="isOpen" name="leftMenu" @close="isOpen = false">
        <oc-sidebar-nav-item active icon="folder" target="home">
          Files
          <template slot="subnav">
            <oc-sidebar-nav-item>All files</oc-sidebar-nav-item>
            <oc-sidebar-nav-item>Favorites</oc-sidebar-nav-item>
            <oc-sidebar-nav-item>Shared with me</oc-sidebar-nav-item>
            <oc-sidebar-nav-item>Shared public</oc-sidebar-nav-item>
            <oc-sidebar-nav-item>External files</oc-sidebar-nav-item>
            <oc-sidebar-nav-item>Tags</oc-sidebar-nav-item>
            <oc-sidebar-nav-item>Deleted files</oc-sidebar-nav-item>
          </template>
        </oc-sidebar-nav-item>

        <oc-sidebar-nav-item icon="account_circle" :isolate="true">Personal settings</oc-sidebar-nav-item>
        <oc-sidebar-nav-divider />
        <oc-sidebar-nav-item icon="application">Administration</oc-sidebar-nav-item>

        <oc-sidebar-nav-item icon="exit_to_app" target="login" :isolate="true">Exit ownCloud</oc-sidebar-nav-item>
      </oc-application-menu>
    </div>
  </template>
  <script>
    export default {
      data: () => ({
        isOpen: false
      }),
      methods: {
        onClick() {
          alert('Click!')
        }
      }
    }
  </script>
  ```
</docs>
