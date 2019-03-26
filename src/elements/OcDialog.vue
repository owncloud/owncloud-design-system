<template>
  <div :id="name" uk-modal>
    <div class="uk-modal-dialog uk-modal-body">
      <h2 class="uk-modal-title">{{ title }}</h2>
      <slot name="content">
        <button class="uk-modal-close" type="button">Close</button>
      </slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "oc-dialog",
  status: "prototype",
  release: "1.0.0",
  props: {
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
}
</script>
<docs>
  ```jsx
  <button uk-toggle="target: #demoModal" type="button">Open</button>
  <oc-dialog name="demoModal" title="Demotitle" />

  <button uk-toggle="target: #contentExample" type="button">Content Slot</button>
  <oc-dialog name="contentExample" title="Create Folder">
    <template slot="content">
      <oc-text-input placeholder="New Folder Name"/>
      <oc-button class="uk-modal-close" text="Create" variation="primary" type="button"></oc-button>
      <oc-button class="uk-modal-close" text="Cancel" variation="secondary" type="button"></oc-button>
    </template>
  </oc-dialog>
  ```
</docs>
