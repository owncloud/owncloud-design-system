<template>
  <div class="oc-contextual-helper">
    <oc-button :id="buttonId" appearance="raw">
      <oc-icon name="question" fill-type="line" size="small" />
    </oc-button>
    <oc-info-drop :drop-id="dropId" :toggle="toggleId"/>
  </div>
</template>

<script>
import uniqueId from "../../../utils/uniqueId"
import OcButton from "../../atoms/OcButton/OcButton.vue"
import OcIcon from "../../atoms/OcIcon/OcIcon.vue"
import OcInfoDrop from "../../molecules/OcInfoDrop/OcInfoDrop.vue"

export default {
  name: "OcContextualHelper",
  status: "unreleased",
  components: { OcButton, OcIcon, OcInfoDrop },
  props: {
    title: {
      type: String,
      required: false,
      default: "",
    },
    text: {
      type: String,
      required: false,
      default: "",
    },
    list: {
      type: Array,
      required: false,
      default: () => [],
    },
    endText: {
      type: String,
      required: false,
      default: "",
    },
    readMoreLink: {
      type: String,
      required: false,
      default: "",
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
  .info-header {
    align-items: center;
  }
  .info-title {
    font-size: 1.125rem;
    font-weight: normal;
  }
  .info-list {
    dt {
      &:first-child {
        margin-top: 0;
      }
      font-weight: bold;
      margin-bottom: var(--oc-space-xsmall);
      margin-top: var(--oc-space-small);
    }
    dd {
      margin-left: 0;
      font-weight: normal;
    }
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

An example using Title, Text, List, End-Text and Read-More-Link properties.
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
        title: this.$gettext('Choose how access is granted '),
        text: this.$gettext("Share a file or folder by link"),
        list: [
          {text: this.$gettext("Only invited people can access"), headline: true},
          {text: this.$gettext("Only people from the list \"Invited people\" can access. If there is no list, no people are invited yet.")},
          {text: this.$gettext("Everyone with the link"), headline: true },
          {text: this.$gettext("Everyone with the link can access. Note: If you share this link with people from the list \"Invited people\", they need to login-in so that their individual assigned permissions can take effect. If they are not logged-in, the permissions of the link take effect.") }
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
