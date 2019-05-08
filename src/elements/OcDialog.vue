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
        <slot name="content"></slot>
      </div>
      <div class="uk-modal-footer">
        <!-- @slot Use this slot for footer buttons like cancel -->
        <slot name="footer"></slot>
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
      <oc-button @click="dialogModel = true">Open</oc-button>
      <oc-dialog name="demoModal" v-model="dialogModel">
        <h2 slot="header">Create folder</h2>
        <template slot="content">
          <oc-text-input placeholder="New Folder Name"/>
        </template>
        <template slot="footer">
          <oc-button @click="dialogModel = false" variation="primary">Create</oc-button>
          <oc-button @click="dialogModel = false" ariation="secondary">Cancel</oc-button>
        </template>
      </oc-dialog>
      <h3 class="uk-heading-divider">
        Info dialog
      </h3>
      <oc-button @click="infoDialogModel = true">Open</oc-button>
      <oc-dialog name="demoInfoModal" title="What is Lorem Ipsum?" v-model="infoDialogModel">
        <template slot="content">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </template>
        <template slot="footer">
          <oc-button @click="infoDialogModel = false" variation="primary">Okay</oc-button>
        </template>
      </oc-dialog>
    </section>
  </template>
  <script>
    export default {
      data: () => {
        return {
          dialogModel: false,
          infoDialogModel: false
        }
      }
    }
  </script>
  ```
</docs>
