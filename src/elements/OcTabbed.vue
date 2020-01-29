<template>
  <div>
    <div
      class="oc-tabbed"
      role="tablist"
      ref="tablist"
      @click="clickHandler"
      @keydown="keydownHandler"
    >
      <slot name="tabs"></slot>
    </div>
    <div ref="panellist">
      <slot name="panels"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "oc-tabbed",
  status: "prototype",
  release: "1.0.0",
  data() {
    return {
      tabs: [],
      panels: [],
      activeTab: `tab-${this.initial}`,
    }
  },
  props: {
    initial: {
      type: String,
      required: true,
      default: null,
    },
  },
  mounted() {
    for (const slotEl of this.$slots.tabs) {
      if (slotEl.componentOptions && slotEl.componentOptions.tag === "oc-tabbed-tab") {
        if (slotEl.componentInstance.$el.disabled) return
        this.tabs.push(slotEl.componentInstance)
      }
    }

    for (const slotEl of this.$slots.panels) {
      if (slotEl.componentOptions && slotEl.componentOptions.tag === "oc-tabbed-panel") {
        this.panels.push(slotEl.componentInstance)
      }
    }

    this.tabs.forEach((tab, i) => {
      tab.$el.setAttribute("aria-controls", this.panels[i].id)
    })

    this.panels.forEach((panel, i) => {
      panel.$el.setAttribute("aria-labelledby", this.tabs[i].id)
    })

    this.changeTab(this.activeTab)
  },
  methods: {
    changeTab(tab) {
      this.$nextTick(() => {
        const tabEl = this.$refs.tablist.querySelector(`#${tab}`)

        this.panels.forEach(panel => {
          panel.$el.hidden = true
        })

        this.$refs.panellist.querySelector(`[aria-labelledby=${tab}]`).hidden = false

        this.$refs.tablist.querySelectorAll("[aria-selected]").forEach(el => {
          el.removeAttribute("aria-selected")
          el.setAttribute("tabindex", "-1")
        })

        tabEl.setAttribute("aria-selected", "true")
        tabEl.setAttribute("tabindex", "0")
        tabEl.focus()

        this.activeTab = tab
        this.$emit("activeTab", tab.replace("tab-", ""))
        this.$emit("click")
      })
    },
    clickHandler(e) {
      if (!e.target.attributes["aria-controls"]) return
      this.changeTab(e.target.id)
    },
    keydownHandler: function(e) {
      const activeElem = this.$refs.tablist.querySelector(`#${this.activeTab}`)
      const activeIndex = Array.from(this.$refs.tablist.children).indexOf(activeElem)
      let targetTab

      switch (e.keyCode) {
      case 37:
        if (activeIndex - 1 < 0) {
          targetTab = this.tabs[this.tabs.length - 1]
        } else {
          targetTab = this.tabs[activeIndex - 1]
        }
        this.changeTab(targetTab.id)
        break
      case 39:
        if (activeIndex + 1 > this.tabs.length - 1) {
          targetTab = this.tabs[0]
        } else {
          targetTab = this.tabs[activeIndex + 1]
        }
        this.changeTab(targetTab.id)
        break
      default:
        return
      }
    },
  },
}
</script>

<docs>
    ```jsx
    <template>
        <oc-tabbed initial="foo">
            <template slot="tabs">
                <oc-tabbed-tab name="foo">Item 1</oc-tabbed-tab>
                <oc-tabbed-tab name="bar">Item 2</oc-tabbed-tab>
                <oc-tabbed-tab name="baz">Item 3</oc-tabbed-tab>
            </template>
            <template slot="panels">
                <oc-tabbed-panel name="foo">Panel 1</oc-tabbed-panel>
                <oc-tabbed-panel name="bar">Panel 2</oc-tabbed-panel>
                <oc-tabbed-panel name="baz">Panel 3</oc-tabbed-panel>
            </template>
        </oc-tabbed>
    </template>

    ```
</docs>
