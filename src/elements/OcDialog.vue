<template>
  <div :id="name" ref="dialog" uk-modal>
    <div class="uk-modal-dialog uk-modal-body">
      <h2 class="uk-modal-title">{{ title }}</h2>
      <slot name="content">
        <button class="uk-modal-close" type="button">Close</button>
      </slot>
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
     *
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
  watch: {
    value: function(valNew) {
      if (valNew) {
        UIkit.modal("#" + this.name).show()
      } else {
        UIkit.modal("#" + this.name).hide()
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
      <oc-dialog name="demoModal" title="Create Folder" v-model="dialogModel">
        <template slot="content">
          <oc-text-input placeholder="New Folder Name"/>
          <oc-button class="uk-modal-close" text="Create" variation="primary" type="button"></oc-button>
          <oc-button class="uk-modal-close" text="Cancel" variation="secondary" type="button"></oc-button>
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
        }
      }
    }
  </script>
  ```
</docs>
