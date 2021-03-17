<template>
  <div class="oc-dropzone">
    <!-- @slot Message inside of the dropzone -->
    <slot />
  </div>
</template>
<script>
export default {
  name: "OcDropzone",
  status: "review",
  release: "0.0.1",
}
</script>

<style lang="scss">
.oc-dropzone {
  align-items: center;
  background-color: var(--oc-background);
  border: 1px dashed var(--oc-variation-primary-muted);
  color: var(--oc-brand-primary);
  display: flex;
  font-size: 1.5rem;
  justify-content: center;
  line-height: 1.5;
  padding: $space-medium;
  text-align: center;

  * {
    pointer-events: none;
  }
}
</style>

<docs>
  ```vue
    <oc-dropzone>
      Drag and drop to upload content into current folder
    </oc-dropzone>
  ```
</docs>
