<template>
  <div :id="id" uk-offcanvas="mode: slide" class="oc-file-actions uk-offcanvas-bottom">
    <div class="uk-offcanvas-bar">
      <span v-text="_label"></span>
      <ul class="uk-nav">
        <template v-for="(action, i) in actions">
          <li :key="i">
            <a class="uk-inline" @click="selectAction(action)">
              <oc-icon v-if="action.icon" :name="action.icon" />
              <span class="uk-text-top" v-text="action.label" />
            </a>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
import UIkit from "uikit"
import { uniqueId as _uniqueId } from "lodash"

/**
 * Create file actions. will be populated by the event payload `filename` and `actions`
 *
 */
export default {
  name: "oc-file-actions",
  status: "prototype",
  release: "1.0.0",
  props: {
    /**
     * The label to display.
     */
    label: {
      type: String,
      required: false,
      default: "Open %s in",
    },
  },
  data() {
    return {
      filename: "",
      actions: [],
      isOpen: false,
    }
  },
  mounted() {
    this.$root.$on("oc-file-actions:open", file => {
      this.showActions(file)
    })
    UIkit.util.on(`#${this.id}`, "hide", () => {
      this.closeActions()
    })
  },
  methods: {
    showActions(file) {
      this.filename = file.filename
      this.actions = file.actions
      this.isOpen = true
    },
    closeActions() {
      this.isOpen = false
      this.actions = []
      this.filename = ""
    },
    selectAction(action) {
      action.onClick()
      this.closeActions()
    },
  },
  computed: {
    _label() {
      return this.label.replace(/\%s/, this.filename)
    },
    id() {
      return _uniqueId("oc-fileaction-")
    },
  },
  watch: {
    isOpen: function(valNew) {
      if (valNew) {
        UIkit.offcanvas(`#${this.id}`).show()
      } else {
        UIkit.offcanvas(`#${this.id}`).hide()
      }
    },
  },
}
</script>

<docs>
```jsx
  <template>
    <div>
      <oc-button @click="fileOpen(file)">click to open actions</oc-button>
      <oc-file-actions />
    </div>
  </template>
  <script>
    export default {
      data () {
        return {
          file: {
            filename: "My file.ext",
            // the actions will be filled by a function
            actions : [
              {
                label:'PDF Viewer',
                icon:'application-pdf',
                onClick: function(){
                  alert("PDF")
                }
              },
              {
                label:'Text editor',
                icon:'text',
                onClick: function(){
                  alert("TXT")
                }
              },
              {
                label:'Office documents',
                icon:'x-office-document',
                onClick: function(){
                  alert("ODT")
                }
              },
              {
                label:'Office presentation',
                icon:'x-office-presentation',
                onClick: function(){
                  alert("ODP")
                }
              },
              {
                label:'Office spreadsheet',
                icon:'x-office-spreadsheet',
                onClick: function(){
                  alert("ODS")
                }
              },
              {
                label:'Media player',
                icon:'video',
                onClick: function(){
                  alert("MP4")
                }
              }
            ]
          }
        }
      },
      methods: {
        fileOpen(file) {
          this.$root.$emit('oc-file-actions:open', file)
        },
      },
    }
  </script>
```
</docs>
