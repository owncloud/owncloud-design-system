<template>
  <span>
    <span
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
    </span>
    <span v-if="accessibleDescription" class="oc-invisible-sr" v-text="accessibleDescription" />
  </span>
</template>

<script>
import { shareType } from "../../../utils/shareType.js"
import OcAvatar from "../../molecules/OcAvatar/OcAvatar.vue"
import OcAvatarCount from "../../atoms/OcAvatarCount/OcAvatarCount.vue"
import OcAvatarLink from "../../molecules/OcAvatarLink/OcAvatarLink.vue"
import OcAvatarGroup from "../../molecules/OcAvatarGroup/OcAvatarGroup.vue"
import OcAvatarFederated from "../../molecules/OcAvatarFederated/OcAvatarFederated.vue"
import OcAvatarGuest from "../../molecules/OcAvatarGuest/OcAvatarGuest.vue"

/**
 * Display a group of avatars
 */
export default {
  name: "OcAvatars",
  status: "ready",
  release: "2.1.0",

  components: {
    OcAvatar,
    OcAvatarCount,
    OcAvatarLink,
    OcAvatarGroup,
    OcAvatarFederated,
    OcAvatarGuest,
  },

  props: {
    /**
     * Users, public links, groups, federated and guests to be displayed with avatars
     */
    items: {
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
      required: false,
      default: null,
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
      const a = this.items.filter(u => u.shareType === shareType.user)
      if (!this.isOverlapping) {
        return a
      }
      return a.slice(0, this.maxDisplayed)
    },

    otherItems() {
      const a = this.items.filter(u => u.shareType !== shareType.user)
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
      switch (item.shareType) {
        case shareType.link:
          return OcAvatarLink
        case shareType.remote:
          return OcAvatarFederated
        case shareType.group:
          return OcAvatarGroup
        case shareType.guest:
          return OcAvatarGuest
      }
    },
  },
}
</script>

<style lang="scss">
.oc-avatars {
  display: inline-flex;
  box-sizing: border-box;
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
