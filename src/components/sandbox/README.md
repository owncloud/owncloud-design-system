# Wrap 3rd-Party ui-library (mission)
one of the tasks that we have in our current sprint is to evaluate if it makes sense to wrap another ui library.

## The why is simple to answer:
* spent less time implementing low level (atoms) components (good example, everyone likes to write his own form component... even if it is already done by many others).
* use something battle proven (cross browser styles, implementation logic, ...) and don't do common failures our own.
* improve speed (development time) to land a new component or even ui feature.

## Decision criteria
* it should not ba a blown up framework, we want to write the business logic on our own (or at least just consume needed parts).
* we're not forced to buy in everything, instead we must be able to pick just the parts we need.
* it should contain most of the needed low level components, it should be our one stop shop! It's a no no to include even other ui libraries to pick some here and some there.
* it must be something battle proven, the community should be strong (or at least big enough) and the project should be around for some time (stars., pr's, issues....)
* the license must fit our needs (consume it in our own opensource project)
* the documentation must be good
* the default look and feel should be nice and crisp, but it's a must have to be able to overwrite the styles (replace!?) and make it CI compliant.
* vue 3 version is around or at least is in active development
* it's always hard to decide and be sure that this will also be a good fit in the future, but we should do our homework and be confident with our decision

## Candidates
* [vuetify](https://github.com/vuetifyjs/vuetify)
* [quasar](https://quasar.dev/)

# Vuetify
## Facts
* 33k stars
* 20 open pull requests
* 980 open issues
* around since 16 Dec 2016
* 697 contributors
* written in typescript, sass/scss and sure vue
* used by 170k projects
* MIT License
* vue 3 version around the corner (beta planned for December 2021 release for February 2022)
* [massive discord community](https://discord.com/invite/s93b7Fv)
* 18 months LTS verisons
* tree shakable
* WCAG Accessibility (a11y) / WCAG / Section 508 / RTL support
* [public roadmap](https://vuetifyjs.com/en/introduction/roadmap/)

## Pro
- easy to integrate
- ui library, not a framework
- typescript
- all above (see facts)

## Con

## Notes
to make it work we have to differentiate between sass and scss [because of](https://github.com/webpack-contrib/sass-loader/blob/0ab22f0a015ac807594482595171b55e8852852c/README.md?plain=1#L312).
This is already done and tested for the docs only mode (docs/docs.config.js) in ODS, testing for the distributed version of ODS still needs to happen.

## Testing
start ODS and search for `sbv` (sandbox-vuetify-ogname) then use it. Example: `/src/components/sandbox/vuetify/*`

## ToDo's
* pull in colleagues (four/six/eight-eyes principle), the decision should stand on the shoulders of many (giants)
* check out every (or most) lib components and check if it's a good fit on the second look too...
* double check license (current stable and upcoming alpha version)
* play with it more, those decisions are hard to revise, and we did this too often in the past...
* make it work for the distributed version of ODS

# Quasar
## Facts
* 20k stars
* 109 open pull requests
* 277 open issues
* around since 14 Aug 2016
* 488 contributors
* written in javascript, css and sure vue
* used by 18k projects
* MIT License
* vue 3 version available
* [massive discord community](https://discord.com/invite/5TDhbDg)
* [a11y!?](https://forum.quasar-framework.org/topic/6134/accessibility-web-content-accessibility-guidelines-wcag)
* [public roadmap](https://github.com/quasarframework/quasar/blob/dev/ROADMAP.md)

## Pro
* ...

## Con
* ...

## Notes
...

## ToDo's
* make it work
* ...