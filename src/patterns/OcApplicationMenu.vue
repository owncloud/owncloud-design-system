<template>
  <div :id="name">
    <div class="uk-offcanvas-bar">
      <button class="uk-offcanvas-close" type="button" @click="onClose" uk-close></button>
      <ul class="uk-nav uk-nav-default">
        <slot name="default"></slot>
      </ul>
    </div>
  </div>
</template>
<script>
import UiKit from "uikit"

/**
 * ## ToDo:
 *
 * - [ ] Fix documentation of this component
 * - [ ] Fix item text alignment
 * - [ ] Fix router handling - see https://github.com/owncloud/owncloud-design-system/pull/121/files#r269616912
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
          mode: "push",
          bgClose: false,
          keyboard: false,
          escClose: false,
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
  <script>
  export default {
    data: () => ({
      isOpen: false
    })
  }
  </script>
  <template>
    <div>
      <oc-button variation="primary" text="Open" @click="isOpen = true"></oc-button>
      <oc-application-menu name="demoMenu" v-model="isOpen" @close="isOpen = false">
        <oc-sidebar-nav-header text="ocNav Header" />

        <oc-sidebar-nav-item text="ocNavItem" active icon="folder" target="home" />

        <oc-sidebar-nav-sub-item text="ocNavSubItem" active icon="folder" target="home">
          <oc-sidebar-nav-item text="Demo Sub Item" target="home" icon="search"/>
          <oc-sidebar-nav-item text="Demo Sub Item" target="home" icon="edit" />
        </oc-sidebar-nav-sub-item>

        <oc-sidebar-nav-divider />

        <oc-sidebar-nav-item text="Exit Owncloud" active icon="exit_to_app" target="login" />
      </oc-application-menu>
    </div>
  </template>
  ```
</docs>
