<template>
    <oc-drop class="oc-width-1-1 oc-info-drop" :drop-id="dropId" :toggle="toggle" :mode="mode" close-on-click>
      <div class="info-drop-content">
        <div v-if="title" class="oc-flex oc-flex-between info-header oc-border-b oc-pb-s">
          <span class="oc-m-rm info-title" v-text="title" />
          <oc-button appearance="raw">
            <oc-icon name="close" fill-type="line" size="medium" />
          </oc-button>
        </div>
        <p class="info-text" v-text="text" />
        <dl v-if="list.length" class="info-list">
          <component :is="item.headline ? 'dt' : 'dd'" v-for="(item, index) in list" :key="index">
            {{ item.text }}
          </component>
        </dl>
        <p v-if="endText" class="info-text-end" v-text="endText" />
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
</template>

<script>
import OcButton from "../../atoms/OcButton/OcButton.vue"
import OcIcon from "../../atoms/OcIcon/OcIcon.vue"
import OcDrop from "../../atoms/OcDrop/OcDrop.vue"
import uniqueId from "../../../utils/uniqueId";

export default {
  name: "OcInfoDrop",
  status: "unreleased",
  components: { OcButton, OcIcon, OcDrop },
  props: {
    dropId: {
      type: String,
      required: false,
      default: uniqueId("oc-info-drop-"),
    },
    toggle: {
      type: String,
      required: false,
      default: "",
    },
    mode: {
      type: String,
      required: false,
      default: "click",
    },
    target: {
      type: String,
      required: false,
      default: null
    },
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
}
</script>

<style lang="scss">
.oc-info-drop {
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
    <oc-info-drop v-bind="helperContent"/>
  </div>
</template>
<script>
export default {
  computed: {
    helperContent() {
      return {
        text: "Invite persons or groups to access this file or folder.",
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
    <oc-info-drop v-bind="helperContent"/>
  </div>
</template>
<script>
export default {
  computed: {
    helperContent() {
      return {
        title: 'Choose how access is granted ',
        text: "Share a file or folder by link",
        list: [
          {text: "Only invited people can access", headline: true},
          {text: "Only people from the list \"Invited people\" can access. If there is no list, no people are invited yet."},
          {text: "Everyone with the link", headline: true },
          {text: "Everyone with the link can access. Note: If you share this link with people from the list \"Invited people\", they need to login-in so that their individual assigned permissions can take effect. If they are not logged-in, the permissions of the link take effect." }
        ],
        endText: "Invited persons can not see who else has access",
        readMoreLink: "https://owncloud.design"
      }
    }
  },
}
</script>
```
</docs>
