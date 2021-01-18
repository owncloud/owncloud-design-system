<template>
  <div
    class="oc-avatar-group"
    :class="{ 'oc-avatar-group-stacked': stacked }"
    :uk-tooltip="tooltip"
  >
    <oc-avatar
      v-for="avatar in avatars"
      :key="avatar.id"
      :src="avatar.avatar"
      :user-name="avatar.username"
      :width="30"
    />
    <oc-avatar-count v-if="isOverlapping" :count="users.length - maxDisplayed" />
  </div>
</template>

<script>
import OcAvatar from "./OcAvatar.vue"
import OcAvatarCount from "./OcAvatarCount.vue"

/**
 * Display a group of avatars
 */
export default {
  name: "OcAvatarGroup",
  status: "review",
  release: "2.1.0",

  components: { OcAvatar, OcAvatarCount },

  props: {
    /**
     * Users to be displayed with avatars
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
  },

  computed: {
    isOverlapping() {
      return this.maxDisplayed && this.maxDisplayed < this.users.length
    },

    tooltip() {
      if (this.isTooltipDisplayed) {
        let tooltip = this.avatars.map(user => user.displayName).join(", ")

        if (this.isOverlapping) {
          tooltip += ` +${this.users.length - this.maxDisplayed}`
        }

        return tooltip
      }

      return null
    },

    avatars() {
      if (this.maxDisplayed) {
        return this.users.slice(0, this.maxDisplayed)
      }

      return this.users
    },
  },
}
</script>

<style lang="scss">
.oc-avatar-group {
  display: flex;
  flex-flow: row wrap;
  gap: $space-xsmall;
  width: fit-content;

  &-stacked {
    .oc-avatar + .oc-avatar,
    .oc-avatar-count {
      border: 1px solid $inverse-color;
      margin-left: -25px;
      transition: margin-left $transition-duration-short ease-in-out;
    }

    &:hover,
    &:focus {
      .oc-avatar + .oc-avatar,
      .oc-avatar-count {
        margin-left: 0;
      }
    }
  }
}
</style>

<docs>
```vue
<template>
  <div>
    <oc-avatar-group :users="users" class="oc-mb" />
    <oc-avatar-group :users="users" :stacked="true" :isTooltipDisplayed="true" class="oc-mb" />
    <oc-avatar-group :users="users" :maxDisplayed="2" :isTooltipDisplayed="true" />
  </div>
</template>
<script>
export default {
  data: () => ({
    users: [
      {
        id: "bob",
        username: "bob",
        displayName: "Bob",
        avatar: "https://images.unsplash.com/photo-1610216705422-caa3fcb6d158?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHwyfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
      },
      {
        id: "marie",
        username: "marie",
        displayName: "Marie",
        avatar: "https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mzh8fGZhY2V8ZW58MHwyfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
      },
      {
        id: "john",
        username: "john",
        displayName: "John Richards Emperor of long names"
      }
    ]
  })
}
</script>
```
</docs>
