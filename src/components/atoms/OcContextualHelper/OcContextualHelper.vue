<template>
  <div class="oc-contextual-helper">
    <oc-button :id="buttonId" appearance="raw">
      <oc-icon name="question" fill-type="line" size="small" />
    </oc-button>
    <oc-drop :drop-id="dropId" :toggle="toggleId" mode="click" close-on-click>
      <div class="info-drop-content">
        <p class="info-text" v-text="text" />
        <ul v-if="list.length" class="info-list oc-pl-l">
          <li v-for="(item, index) in list" :key="index" class="oc-pl-rm">
            {{ item }}
          </li>
        </ul>
        <p class="info-text-end" v-text="endText" />
        <oc-button
          v-if="readMoreLink"
          v-translate
          type="a"
          appearance="raw"
          size="small"
          class="info-more-link"
          :href="readMoreLink"
          target="_blank"
          >Read more</oc-button
        >
      </div>
    </oc-drop>
  </div>
</template>

<script>
import uniqueId from "../../../utils/uniqueId"
import OcButton from "../../atoms/OcButton/OcButton.vue"
import OcIcon from "../../atoms/OcIcon/OcIcon.vue"
import OcDrop from "../../atoms/OcDrop/OcDrop.vue"

export default {
  name: "OcContextualHelper",
  status: "ready",
  release: "13.1.0",
  components: { OcButton, OcIcon, OcDrop },
  props: {
    text: {
      type: String,
      required: false,
    },
    list: {
      type: Array,
      required: false,
      default: () => [],
    },
    endText: {
      type: String,
      required: false,
    },
    readMoreLink: {
      type: String,
      required: false,
    },
  },
  computed: {
    dropId() {
      return uniqueId("oc-contextual-helper-")
    },
    buttonId() {
      return `${this.dropId}-button`
    },
    toggleId() {
      return `#${this.buttonId}`
    },
  },
}
</script>

<style lang="scss">
.oc-contextual-helper {
  display: inline-block;
  .oc-button {
    vertical-align: middle;
  }
  .info-drop-content {
    font-size: var(--oc-font-size-small);
    color: var(--oc-color-text-default);
  }
  .info-more-link {
    font-size: var(--oc-font-size-small) !important;
  }
}
</style>

<docs>
## Examples
A simple example, using only text.
```js
<template>
  <div>
    <oc-contextual-helper v-bind="helperContent"/>
  </div>
</template>
<script>
export default {
  computed: {
    helperContent() {
      return {
        text: this.$gettext("Invite persons or groups to access this file or folder."),
      }
    }
  },
}
</script>
```

An example using Text, List, End-Text and Read-More-Link properties.
```js
<template>
  <div>
    <oc-contextual-helper v-bind="helperContent"/>
  </div>
</template>
<script>
export default {
  computed: {
    helperContent() {
      return {
        text: this.$gettext("Invite persons or groups to access this file or folder."),
        list: [
          this.$gettext("Enter a name or group to share this item"),
          this.$gettext("If you share a folder,  all of its contents and subfolders will be shared with the entered persons or groups"),
          this.$gettext("Invited persons or groups will be notified via e-mail or in-app notification"),
        ],
        endText: this.$gettext("Invited persons can not see who else has access"),
        readMoreLink: "https://owncloud.design"
      }
    }
  },
}
</script>
```
</docs>
