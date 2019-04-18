<template>
  <div class="oc-dropzone">
    <span class="uk-text-lead">
      <slot />
    </span>
  </div>
</template>
<script>
export default {
  name: "oc-dropzone",
  status: "review",
  release: "0.0.1",
}
</script>
<docs>
  ```jsx
  <template>
    <oc-dropzone>
      Drag and drop to upload content into current folder
    </oc-dropzone>
  </template>
  ```
</docs>
