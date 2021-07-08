<template>
  <div>
    <div
      v-oc-tooltip="tooltip"
      class="oc-avatar-group"
      :class="{ 'oc-avatar-group-stacked': stacked }"
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
      <template v-if="links.length > 0">
        <oc-avatar-link v-for="(link, index) in links" :key="link.name + index" :name="link.name" />
      </template>
      <oc-avatar-count v-if="isOverlapping" :count="users.length - maxDisplayed" />
    </div>
    <span class="oc-invisible-sr" v-text="accessibleDescription"></span>
  </div>
</template>

<script>
import OcAvatar from "./OcAvatar.vue"
import OcAvatarCount from "./OcAvatarCount.vue"
import OcAvatarLink from "./OcAvatarLink.vue"

/**
 * Display a group of avatars
 */
export default {
  name: "OcAvatarGroup",
  status: "ready",
  release: "2.1.0",

  components: { OcAvatar, OcAvatarCount, OcAvatarLink },

  props: {
    /**
     * Users and public links to be displayed with avatars
     */
    users: {
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
      return this.maxDisplayed && this.maxDisplayed < this.users.length
    },

    tooltip() {
      if (this.isTooltipDisplayed) {
        const names = this.avatars.map(user => user.displayName)

        if (this.links.length > 0) {
          names.push(...this.links.map(link => link.name))
        }

        let tooltip = names.join(", ")

        if (this.isOverlapping) {
          tooltip += ` +${this.users.length - this.maxDisplayed}`
        }

        return tooltip
      }

      return null
    },

    avatars() {
      const a = this.users.filter(u => !u.link)
      if (!this.isOverlapping) {
        return a
      }
      return a.slice(0, this.maxDisplayed)
    },

    links() {
      const a = this.users.filter(u => !!u.link)
      if (!this.isOverlapping) {
        return a
      }
      if (this.maxDisplayed <= this.avatars.length) {
        return []
      }
      return a.slice(0, this.maxDisplayed - this.avatars.length)
    },
  },
}
</script>

<style lang="scss">
.oc-avatar-group {
  display: flex;
  flex-flow: row wrap;
  gap: var(--oc-space-xsmall);
  width: fit-content;

  &-stacked {
    .oc-avatar + .oc-avatar,
    .oc-avatar-count,
    .oc-avatar + .oc-avatar-link,
    .oc-avatar-link + .oc-avatar-link {
      border: 1px solid var(--oc-color-text-inverse);
      margin-left: -25px;
      transition: margin-left $transition-duration-short ease-in-out;
    }

    &:hover,
    &:focus {
      .oc-avatar + .oc-avatar,
      .oc-avatar-count,
      .oc-avatar + .oc-avatar-link,
      .oc-avatar-link + .oc-avatar-link {
        margin-left: 0;
      }
    }
  }
}
</style>

<docs>
```js
<template>
  <div>
    <oc-avatar-group :users="users" accessible-description="This resource is shared with many users." class="oc-mb" />
    <oc-avatar-group :users="users" accessible-description="This resource is shared with many users." :stacked="true" :isTooltipDisplayed="true" class="oc-mb" />
    <oc-avatar-group :users="users" accessible-description="This resource is shared with many users." :maxDisplayed="2" :isTooltipDisplayed="true" />
  </div>
</template>
<script>
export default {
  data: () => ({
    users: [
      {
        username: "bob",
        displayName: "Bob",
        avatar: "https://images.unsplash.com/photo-1610216705422-caa3fcb6d158?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHwyfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
      },
      {
        username: "marie",
        displayName: "Marie",
        avatar: "https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mzh8fGZhY2V8ZW58MHwyfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
      },
      {
        username: "john",
        displayName: "John Richards Emperor of long names"
      },
      {
        name: "Public link",
        link: true
      }
    ]
  })
}
</script>
```
</docs>
