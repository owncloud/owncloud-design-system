# ownCloud Design System
[![Build Status](https://drone.owncloud.com/api/badges/owncloud/owncloud-design-system/status.svg)](https://drone.owncloud.com/owncloud/owncloud-design-system)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=owncloud_owncloud-design-system&metric=coverage)](https://sonarcloud.io/dashboard?id=owncloud_owncloud-design-system)

**ownCloud Design System** is based on [Vue Design System](https://vueds.com/) - **Thanks a lot to [@viljamis](https://twitter.com/viljamis)**

Head over to the [generated docs](https://owncloud.github.io/owncloud-design-system/) for more information!

## Installation

Install the ownCloud design system by running

```
npm install owncloud-design-system
```

or

```
yarn add owncloud-design-system
```

or

```
pnpm add owncloud-design-system
```

and its `peerDependencies`, depending on whether they're already available in your project via


```
npm install @popperjs/core @vue/composition-api filesize focus-trap focus-trap-vue fuse.js luxon postcss-import postcss-url tippy.js v-calendar vue vue-inline-svg vue-select webfontloader
```

or


```
yarn add @popperjs/core @vue/composition-api filesize focus-trap focus-trap-vue fuse.js luxon postcss-import postcss-url tippy.js v-calendar vue vue-inline-svg vue-select webfontloader
```

or

```
pnpm add @popperjs/core @vue/composition-api filesize focus-trap focus-trap-vue fuse.js luxon postcss-import postcss-url tippy.js v-calendar vue vue-inline-svg vue-select webfontloader
```

## How to build locally

You basically run

`pnpm install`

followed by
`pnpm start`

This will fire up a web server at http://localhost:6060.
Any changes to the code base will result it rebuilding the docs and reloading the content in the browser.
