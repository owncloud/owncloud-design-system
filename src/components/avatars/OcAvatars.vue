<template>
  <div>
    <div
      v-oc-tooltip="tooltip"
      class="oc-avatars"
      :class="{ 'oc-avatars-stacked': stacked }"
      aria-hidden="true"
    >
      <template v-if="avatars.length > 0">
        <oc-avatar
          v-for="avatar in avatars"
          :key="avatar.username"
          :src="avatar.avatar"
          :user-name="avatar.displayName"
          :width="30"
        />
      </template>
      <template v-if="otherItems.length > 0">
        <component
          :is="getAvatarComponentForItem(item)"
          v-for="(item, index) in otherItems"
          :key="item.name + index"
          :name="item.name"
        />
      </template>
      <oc-avatar-count v-if="isOverlapping" :count="items.length - maxDisplayed" />
    </div>
    <span class="oc-invisible-sr" v-text="accessibleDescription"></span>
  </div>
</template>

<script>
import OcAvatar from "./OcAvatar.vue"
import OcAvatarCount from "./OcAvatarCount.vue"
import OcAvatarLink from "./OcAvatarLink.vue"
import OcAvatarGroup from "./OcAvatarGroup.vue"
import OcAvatarFederated from "./OcAvatarFederated.vue"
import OcAvatarGuest from "./OcAvatarGuest.vue"

/**
 * Display a group of avatars
 */
export default {
  name: "OcAvatars",
  status: "ready",
  release: "2.1.0",

  components: { OcAvatar, OcAvatarCount, OcAvatarLink },

  props: {
    /**
     * Users, public links, groups, federated and guests to be displayed with avatars
     */
    items: {
      // find better name eg. items
      type: Array,
      required: true,
    },
    /**
     * Asserts whether avatars should be stacked on each other
     */
    stacked: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * Asserts whether tooltip should be displayed on hover/focus
     */
    isTooltipDisplayed: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * Limits the number of avatars which will be displayed
     */
    maxDisplayed: {
      type: Number,
      required: false,
      default: null,
    },
    /**
     * A description of the avatar group for screen readers. This is required as the avatar group element
     * is hidden for screen readers.
     */
    accessibleDescription: {
      type: String,
      required: true,
    },
  },

  computed: {
    isOverlapping() {
      return this.maxDisplayed && this.maxDisplayed < this.items.length
    },

    tooltip() {
      if (this.isTooltipDisplayed) {
        const names = this.avatars.map(user => user.displayName)

        if (this.otherItems.length > 0) {
          names.push(...this.otherItems.map(item => item.name))
        }

        let tooltip = names.join(", ")

        if (this.isOverlapping) {
          tooltip += ` +${this.items.length - this.maxDisplayed}`
        }

        return tooltip
      }

      return null
    },

    avatars() {
      const a = this.items.filter(u => u.sharedType === "people")
      if (!this.isOverlapping) {
        return a
      }
      return a.slice(0, this.maxDisplayed)
    },

    otherItems() {
      const a = this.items.filter(u => u.sharedType !== "people")
      if (!this.isOverlapping) {
        return a
      }
      if (this.maxDisplayed <= this.avatars.length) {
        return []
      }
      return a.slice(0, this.maxDisplayed - this.avatars.length)
    },
  },
  methods: {
    getAvatarComponentForItem(item) {
      switch (item.sharedType) {
        case "link":
          return OcAvatarLink
        case "federated":
          return OcAvatarFederated
        case "group":
          return OcAvatarGroup
        case "guest":
          return OcAvatarGuest
      }
    },
  },
}
</script>

<style lang="scss">
.oc-avatars {
  display: flex;
  flex-flow: row wrap;
  gap: var(--oc-space-xsmall);
  width: fit-content;

  &-stacked {
    .oc-avatar + .oc-avatar,
    .oc-avatar-count,
    .oc-avatar + .oc-avatar-item,
    .oc-avatar-item + .oc-avatar-item {
      border: 1px solid var(--oc-color-text-inverse);
      margin-left: -25px;
    }
  }
}
</style>

<docs>
```js
<template>
  <div>
    <oc-avatars :items="items" accessible-description="This resource is shared with many users." class="oc-mb" />
    <oc-avatars :items="items" accessible-description="This resource is shared with many users." :stacked="true" :isTooltipDisplayed="true" :maxDisplayed="5" class="oc-mb" />
    <oc-avatars :items="items" accessible-description="This resource is shared with many users." :maxDisplayed="2" :isTooltipDisplayed="true" />
  </div>
</template>
<script>
export default {
  data: () => ({
    items: [
      {
        name: "bob",
        sharedType: 'federated'
      },
      {
        username: "marie",
        displayName: "Marie",
        avatar: "https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mzh8fGZhY2V8ZW58MHwyfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
        sharedType: 'people'
      },
      {
        username: "peter",
        displayName: "Peter",
        avatar: "https://images.unsplash.com/photo-1610216705422-caa3fcb6d158?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHwyfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
        sharedType: 'people'
      },
      {
        username: "udo",
        displayName: "Udo",
        avatar: "https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mzh8fGZhY2V8ZW58MHwyfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
        sharedType: 'people'
      },
      {
        name: "john",
        sharedType: 'guest'
      },
      {
        name: "Public link",
        sharedType: 'link'
      },
      {
        name: "Test",
        sharedType: 'group'
      }
    ]
  })
}
</script>
```
</docs>
