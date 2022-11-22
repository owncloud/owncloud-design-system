# Announcement: This is (likely) not the repo you're looking for
The design system is alive and kicking. We've decided to move the code into the [ownCloud Web](https://github.com/owncloud/web) mono-repository to streamline
development processes. Publishing to [npmjs](https://npmjs.com) and deploying the [docs](https://owncloud.design) will happen from
the web mono-repo as well in the near future. This means:
- If you're a developer using the design system, nothing changes for you.
- If you want to contribute to the design system, please open a pull request in [ownCloud Web](https://github.com/owncloud/web).
  You can find the design system in the sub folder [packages/design-system](https://github.com/owncloud/web/tree/master/packages/design-system)

As the actively supported [web stable-6.0 branch](https://github.com/owncloud/web/tree/stable-6.0) depends on the design system version `14.0.x`,
we'll keep the [design system stable-14.0 branch](https://github.com/owncloud/owncloud-design-system/tree/stable-14.0) in this repo alive as long as
web v6.0 is supported. As soon as web v6.0 is not supported anymore, we'll archive the design system repository.
(side note: end of support for v6.0 is not known, yet. We'll update this document as soon as it's decided.)

---

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
