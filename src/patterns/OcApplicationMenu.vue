<template>
  <div :id="name">
    <div class="uk-offcanvas-bar uk-background-muted">
      <button class="uk-offcanvas-close" type="button" @click="onClose" uk-close></button>
      <ul class="oc-main-menu uk-nav" uk-nav="multiple: true">
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
  <template>
    <section>
      <h3 class="uk-heading-divider">
        Application Menu
      </h3>
      <oc-button variation="primary" text="Open" @click="isOpen = true"></oc-button>
      <oc-application-menu name="demoMenu" v-model="isOpen" @close="isOpen = false">
        <oc-sidebar-nav-header text="Menu Header" />

        <oc-sidebar-nav-item text="Active Item" active icon="folder" target="home" />
        <oc-sidebar-nav-item icon="folder" target="home">
          <template v-slot:text>
            Item with text in slot
          </template>
        </oc-sidebar-nav-item>
        <oc-sidebar-nav-item icon="folder" target="home">
          <template v-slot:text>
            Item with text in slot and with children
          </template>
          <oc-sidebar-nav-item text="Child Item" target="home" icon="edit" />
        </oc-sidebar-nav-item>

        <oc-sidebar-nav-item text="Item with children" icon="folder" target="home">
          <oc-sidebar-nav-item text="Child Item with click handler" icon="search" @click="onClick"/>
          <oc-sidebar-nav-item text="Child Item" target="home" icon="edit" />
        </oc-sidebar-nav-item>

        <oc-sidebar-nav-divider />

        <oc-sidebar-nav-item active icon="exit_to_app" target="login">
          <template slot="text">Exit ownCloud</template></oc-sidebar-nav-item>
      </oc-application-menu>
    </section>
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
