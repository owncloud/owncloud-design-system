<template>
  <nav :class="_topBarClass" uk-navbar>
    <div class="uk-navbar-left">
      <slot name="left"></slot>
    </div>
    <div class="uk-navbar-center">
      <slot name="title"></slot>
    </div>
    <div class="uk-navbar-right">
      <slot name="right"></slot>
    </div>
  </nav>
</template>

<script>
import OcBreadcrumb from "../elements/OcBreadcrumb"
/**
 * The top bar is a basic navigation bar element.
 * It has 3 slots: `left, title, right` which can be filled with elements.
 *
 * ##TODO:
 *
 * - [ ] fix text color
 * - [ ] create components to hide uk-nav-item elements
 * - [ ] add capability to have the topbar stick to the browser window - remaining content is scrollable
 */
export default {
  name: "oc-topbar",
  components: { OcBreadcrumb },
  status: "review",
  release: "1.0.0",
  props: {
    /**
     * Style variation to give additional meaning.
     * `primary, secondary`
     */
    variation: {
      type: String,
      default: "primary",
      validator: value => {
        return value.match(/(primary|secondary)/)
      },
    },
  },
  computed: {
    _topBarClass() {
      let classes = ["uk-navbar-container", "uk-navbar-transparent"]

      if (this.variation === "primary") {
        classes.push(`uk-background-primary`)
        classes.push(`uk-text-muted`)
      } else {
        classes.push(`uk-background`)
      }

      return classes
    },
  },
}
</script>

<docs>
  ```jsx
  <oc-topbar variation="primary">
    <template slot="left">
      <div class="uk-navbar-item uk-logo">
        <oc-icon name="menu"></oc-icon>
      </div>
      <span class="uk-navbar-item">Files</span>
    </template>
    <template slot="title">
      <div class="uk-navbar-item">
        <oc-img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJFYmVuZV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMjI0IDEyMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjI0IDEyMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiNGRkZGRkY7fQo8L3N0eWxlPgo8cGF0aCBpZD0iU2hhcGVfMl8iIGNsYXNzPSJzdDAiIGQ9Ik00OS4zLDM4LjNjLTEuMy0yLjItMi00LjgtMi03LjZjMC04LjUsNi45LTE1LjMsMTUuNS0xNS4zYzMuMiwwLDYuMSwwLjksOC41LDIuNgoJYy0xLjgsNC4xLTIuOCw4LjUtMi44LDEzLjNjMCwwLjksMCwxLjcsMC4xLDIuNmMtMC42LDAtMS4yLDAtMS44LDBDNjAuNCwzMy44LDU0LjUsMzUuNSw0OS4zLDM4LjNMNDkuMywzOC4zeiBNNDUuOSw5Ny44CgljLTktNi40LTE0LjgtMTYuOS0xNC44LTI4LjZjMC0zLDAuNC01LjksMS4xLTguN2MtMC4zLDAtMC42LDAtMC45LDBjLTE2LjQsMC0yOS43LDEzLjItMjkuNywyOS41YzAsMTYuMiwxMy4zLDI5LjUsMjkuNywyOS41CgljNi4zLDAsMTIuMS0xLjksMTYuOC01LjJjLTItMy0zLjEtNi43LTMuMS0xMC41QzQ1LDEwMS42LDQ1LjMsOTkuNiw0NS45LDk3LjhMNDUuOSw5Ny44eiBNNDcuMiw5NC42YzIuNy01LjEsNy41LTguOCwxMy4zLTEwLjEKCWMwLjUtMC4xLDEuMS0wLjIsMS43LTAuM2MwLjYtMC4xLDEuMS0wLjEsMS43LTAuMWMwLjMsMCwwLjUsMCwwLjgsMGMwLjksMCwxLjgsMC4xLDIuNywwLjJjLTAuMy0yLTAuNC00LTAuNC02LjEKCWMwLTkuOSwzLjMtMTkuMSw4LjgtMjYuNWMtMS4zLTEuNS0yLjQtMy4yLTMuMy01Yy0wLjMtMC41LTAuNS0xLTAuOC0xLjVjLTAuMi0wLjUtMC41LTEtMC43LTEuNWMtMC45LTIuMS0xLjUtNC4zLTEuOS02LjUKCWMtMC44LTAuMS0xLjUtMC4xLTIuMy0wLjFjLTUuNiwwLTEwLjksMS40LTE1LjQsMy45Yy0wLjUsMC4zLTEsMC42LTEuNSwwLjljLTAuNSwwLjMtMSwwLjYtMS40LDAuOWMtNS4yLDMuNi05LjMsOC43LTExLjcsMTQuNwoJYy0wLjIsMC41LTAuNCwxLjEtMC42LDEuNmMtMC4yLDAuNS0wLjMsMS4xLTAuNSwxLjZjLTAuNywyLjctMS4xLDUuNS0xLjEsOC40QzM0LjQsNzkuNSwzOS41LDg4LjgsNDcuMiw5NC42TDQ3LjIsOTQuNnoKCSBNMTUxLjQsNTYuOWM0LjMtMi4yLDkuMS0zLjYsMTQuMi00QzE2NC4zLDM3LjksMTUxLjYsMjYsMTM2LDI2Yy0wLjYsMC0xLjIsMC0xLjgsMC4xYzAuMywxLjcsMC40LDMuNCwwLjQsNS4yYzAsMi43LTAuMyw1LjQtMSw3LjkKCUMxNDEuMiw0My4zLDE0Ny4zLDQ5LjUsMTUxLjQsNTYuOUwxNTEuNCw1Ni45eiBNNzIuMiwzNS45YzAuMSwwLjYsMC4yLDEuMiwwLjMsMS44YzAuMywxLjMsMC43LDIuNiwxLjIsMy45CgljMC4yLDAuNiwwLjQsMS4xLDAuNywxLjdjMC4yLDAuNSwwLjUsMS4xLDAuOCwxLjZjMC44LDEuNSwxLjcsMi45LDIuNyw0LjNjMi4xLTIuNCw0LjQtNC41LDYuOS02LjRjMC41LTAuNCwxLTAuNywxLjUtMQoJYzAuNS0wLjMsMS0wLjcsMS41LTFjNi44LTQuMywxNC45LTYuOSwyMy42LTdjMC4yLDAsMC40LDAsMC42LDBjMC42LDAsMS4xLDAsMS43LDBjMC44LDAsMS41LDAuMSwyLjMsMC4xCgljNS4yLDAuNSwxMC4xLDEuOCwxNC43LDMuOGMwLjUtMi4xLDAuNy00LjIsMC43LTYuNGMwLTEuNi0wLjEtMy4yLTAuNC00LjhjLTAuMS0wLjYtMC4yLTEuMS0wLjMtMS42Yy0wLjEtMC41LTAuMy0xLjEtMC40LTEuNgoJYy0zLjYtMTIuMy0xNS0yMS40LTI4LjYtMjEuNGMtMTEuMiwwLTIxLDYuMi0yNiwxNS4zYy0wLjMsMC41LTAuNiwxLTAuOCwxLjVjLTAuMywwLjUtMC41LDEuMS0wLjcsMS43Yy0xLjQsMy40LTIuMiw3LjEtMi4yLDExCgljMCwxLDAuMSwyLDAuMSwyLjlDNzIsMzQuOCw3Mi4xLDM1LjQsNzIuMiwzNS45TDcyLjIsMzUuOXogTTIwNi4yLDg1LjhjLTAuOSwwLTEuOCwwLjEtMi42LDAuMmMwLDAuNywwLjEsMS41LDAuMSwyLjIKCWMwLDkuNC0zLjcsMTcuOS05LjgsMjQuM2MzLDMuNCw3LjQsNS42LDEyLjMsNS42YzksMCwxNi4zLTcuMiwxNi4zLTE2LjFDMjIyLjUsOTMsMjE1LjIsODUuOCwyMDYuMiw4NS44TDIwNi4yLDg1Ljh6IE0yMDAuMiw4Ni45CgljMC0wLjYtMC4xLTEuMi0wLjEtMS43Yy0wLjEtMC42LTAuMS0xLjEtMC4yLTEuN2MtMi4zLTE1LTE1LjEtMjYuNy0zMC44LTI3LjJjLTAuNCwwLTAuOCwwLTEuMiwwYy0wLjIsMC0wLjMsMC0wLjUsMAoJYy0wLjYsMC0xLjEsMC0xLjcsMC4xYy00LjYsMC4zLTguOSwxLjYtMTIuOCwzLjZjMi4zLDUuMSwzLjcsMTAuNyw0LDE2LjZjMCwwLjYsMCwxLjIsMCwxLjhjMCwwLjIsMCwwLjMsMCwwLjVjMCwwLjgsMCwxLjUtMC4xLDIuMgoJYy0wLjcsMTEuMS01LjUsMjEuMS0xMi45LDI4LjZjNS45LDYuNSwxNC41LDEwLjYsMjQsMTAuNmM4LjIsMCwxNS43LTMuMSwyMS40LTguMWMwLjQtMC40LDAuOS0wLjgsMS4zLTEuMmMwLjQtMC40LDAuOC0wLjgsMS4yLTEuMwoJYzUuMi01LjcsOC40LTEzLjIsOC40LTIxLjVDMjAwLjMsODcuOCwyMDAuMiw4Ny4zLDIwMC4yLDg2LjlMMjAwLjIsODYuOXogTTczLjksMTAyLjFjLTAuMy0wLjUtMC42LTEtMC45LTEuNQoJYy0yLjMtMy45LTQtOC4yLTUtMTIuN2MtMS4xLTAuMi0yLjItMC4zLTMuMy0wLjNjLTAuMSwwLTAuMiwwLTAuNCwwYy0wLjYsMC0xLjEsMC4xLTEuNywwLjFjLTAuNiwwLjEtMS4xLDAuMi0xLjcsMC4zCgljLTQuOCwxLjEtOC44LDQuMy0xMC45LDguNmMtMC4zLDAuNS0wLjUsMS0wLjcsMS42Yy0wLjIsMC41LTAuNCwxLjEtMC41LDEuNmMtMC4zLDEuMy0wLjUsMi42LTAuNSwzLjljMCwzLjEsMC45LDYsMi40LDguNQoJYzAuMywwLjUsMC42LDAuOSwxLDEuNGMwLjMsMC40LDAuNywwLjksMS4xLDEuM2MzLDMuMSw3LjEsNSwxMS44LDVjNi45LDAsMTIuOC00LjMsMTUuMi0xMC4zYy0xLjgtMS44LTMuNS0zLjgtNC45LTUuOQoJQzc0LjYsMTAzLjEsNzQuMiwxMDIuNiw3My45LDEwMi4xTDczLjksMTAyLjF6IE0xNTMuNCw4MS40YzAuMS0wLjcsMC4xLTEuNCwwLjEtMi4xYzAtMC40LDAtMC43LDAtMS4xYzAtNS45LTEuMy0xMS41LTMuNi0xNi42CgljLTAuMi0wLjUtMC41LTEtMC43LTEuNWMtMC4yLTAuNS0wLjUtMS0wLjgtMS41Yy0zLjctNi43LTkuMi0xMi4zLTE1LjgtMTYuMWMtMC41LTAuMy0xLTAuNi0xLjUtMC44Yy0wLjUtMC4zLTEtMC41LTEuNS0wLjgKCWMtNS4xLTIuNC0xMC44LTMuOC0xNi44LTMuOWMtMC4zLDAtMC42LDAtMSwwYy0wLjQsMC0wLjgsMC0xLjIsMGMtMC43LDAtMS40LDAuMS0yLjEsMC4xYy02LjYsMC41LTEyLjcsMi41LTE4LjEsNS43CgljLTAuNSwwLjMtMSwwLjYtMS41LDAuOWMtMC41LDAuMy0xLDAuNy0xLjQsMWMtMi44LDItNS4zLDQuMy03LjUsNi45Yy0wLjQsMC40LTAuNywwLjktMS4xLDEuM2MtMC4zLDAuNC0wLjcsMC45LTEsMS4zCgljLTQuOSw2LjctNy43LDE1LTcuNywyMy45YzAsMi40LDAuMiw0LjcsMC42LDYuOWMwLjEsMC42LDAuMiwxLjMsMC40LDEuOWMwLjIsMC43LDAuMywxLjQsMC41LDIuMWMxLDMuOCwyLjYsNy4zLDQuNiwxMC42CgljMC4zLDAuNSwwLjYsMSwwLjksMS41YzAuMywwLjUsMC43LDEsMSwxLjRjMC44LDEuMSwxLjYsMi4xLDIuNSwzYzAuNSwwLjUsMSwxLjEsMS41LDEuNmMwLjUsMC41LDAuOSwwLjksMS40LDEuNAoJYzcuNCw2LjgsMTcuNCwxMSwyOC4yLDExYzEwLjUsMCwyMC4xLTMuOSwyNy40LTEwLjJjMC40LTAuNCwwLjgtMC43LDEuMi0xLjFjMC40LTAuNCwwLjgtMC44LDEuMi0xLjJjNi4xLTYuMiwxMC4yLTE0LjMsMTEuNC0yMy40CglDMTUzLjMsODIuOSwxNTMuNCw4Mi4xLDE1My40LDgxLjRMMTUzLjQsODEuNHoiLz4KPC9zdmc+Cg==" width="80px" />
      </div>
    </template>
    <template slot="right">
      <div class="uk-navbar-item">
        <oc-icon name="account_circle" color="white"></oc-icon>
        <span class="right">Alice</span>
      </div>
    </template>
  </oc-topbar>
  <oc-topbar variation="secondary">
    <template slot="left">
      <div class="uk-navbar-item uk-logo">
        <oc-icon name="home"></oc-icon>
      </div>
      <oc-breadcrumb :items="[{text:'Home',to:'/'},{text:'Folder',to:{path:'folder'}},{text:'Subfolder'}]"></oc-breadcrumb>
    </template>
  </oc-topbar>

  ```
</docs>
