<template>
  <div :id="name" ref="dialog" uk-modal>
    <div uk-dialog="{bgclose: false, escclose: false}" class="uk-modal-dialog uk-modal-body">
      <div class="uk-modal-header">
        <!-- @slot Use this slot for the header -->
        <slot name="header">
          <h2 class="uk-modal-title">{{ title }}</h2>
        </slot>
      </div>
      <div class="uk-modal-body">
        <!-- @slot Use this slot for the content -->
        <slot name="content"> </slot>
      </div>
      <div class="uk-modal-footer">
        <!-- @slot Use this slot for footer buttons like cancel -->
        <slot name="footer">
          <oc-button
            variation="secondary"
            class="uk-modal-close"
            text="Close"
            type="button"
          ></oc-button>
        </slot>
      </div>
    </div>
  </div>
</template>
<script>
import UIkit from "uikit"

export default {
  name: "oc-dialog",
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
     * Id or Name of the dialog. Used to reference for open.
     */
    name: {
      type: String,
      required: true,
    },
    /**
     * Title of the dialog.
     */
    title: {
      type: String,
      required: false,
    },
  },
  watch: {
    value: function(valNew) {
      if (valNew) {
        UIkit.modal(`#${this.name}`, { bgClose: false, keyboard: false, escClose: false }).show()
      } else {
        UIkit.modal(`#${this.name}`).hide()
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
        Prompt Dialog
      </h3>
      <oc-button @click="showDialog" text="Open"></oc-button>
      <oc-dialog name="demoModal" title="Create Folder" v-model="isOpen">
        <template slot="content">
          <oc-text-input placeholder="New Folder Name"/>
        </template>
        <template slot="footer">
          <oc-button @click="closeDialog" class="uk-modal-close" text="Create" variation="primary" type="button"></oc-button>
          <oc-button @click="closeDialog" class="uk-modal-close" text="Cancel" variation="secondary" type="button"></oc-button>
        </template>
      </oc-dialog>
    </section>
  </template>
  <script>
    export default {
      data: () => {
        return {
          dialogModel: false
        }
      },
      methods: {
        showDialog() {
          this.dialogModel = true
        },
        closeDialog () {
          this.dialogModel = false
        }
      },
      computed: {
        isOpen: {
          get () {
            return this.dialogModel
          },
          set (val) {
            this.dialogModel = val
          }
        }
      }
    }
  </script>
  ```
</docs>
