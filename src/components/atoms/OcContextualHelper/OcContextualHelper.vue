<template>
  <div class="oc-contextual-helper">
    <oc-button :id="buttonId" appearance="raw">
      <oc-icon name="close" fill-type="line" size="medium" />
    </oc-button>
    <oc-drop class="oc-width-1-1" :drop-id="dropId" :toggle="toggleId" mode="click" close-on-click>
      <div class="info-drop-content">
        <div v-if="title" class="oc-flex oc-flex-between info-title oc-border-b oc-pb-s">
          <h1 class="oc-m-rm" v-text="title" />
          <oc-button appearance="raw">
            <oc-icon name="close" fill-type="line" size="medium" />
          </oc-button>
        </div>
        <p class="info-text" v-text="text" />
        <dl v-if="list.length" class="info-list">
          <component
            :is="item.headline ? 'dt' : 'dd'"
            v-for="(item, index) in list"
            :key="index"
            class="oc-ml-rm"
            :class="{ headline: item.headline }"
          >
            {{ item.text }}
          </component>
        </dl>
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
  status: "unreleased",
  components: { OcButton, OcIcon, OcDrop },
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
  .info-title {
    align-items: center;

    h1 {
      font-size: 1.125rem;
      font-weight: normal;
    }
  }
  .info-list {
    .headline {
      &:first-child {
        margin-top: 0;
      }
      font-weight: bold;
      margin-bottom: var(--oc-space-xsmall);
      margin-top: var(--oc-space-small);
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
