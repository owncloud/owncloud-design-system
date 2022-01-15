import esbuild from 'esbuild'
import { sassPlugin } from 'esbuild-sass-plugin'
import copy from 'esbuild-plugin-copy'

import { createRequire } from 'module'
const require = createRequire(import.meta.url)

const path = require('path')
const vuePlugin = require('esbuild-vue')

await esbuild.build({
  logLevel: "info",
  entryPoints: ["src/system.js"],
  bundle: true,
  minify: true,
  sourcemap: true,
  target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
  outdir: "dist/system/",
  plugins: [
    sassPlugin({
      precompile(source, pathname) {
        const basedir = path.dirname(pathname)
        return source.replace(/(url\(['"]?)(\.\.?\/)([^'")]+['"]?\))/g, `$1${basedir}/$2$3`)
      }
    }),
    vuePlugin(),
    copy.default({
      assets: [
        {
          from: ['./src/assets/icons/*'],
          to: ['./icons'],
        },
        {
          from: ['./l10n/translations.json'],
          to: ['./'],
        },
        {
          from: ['./src/assets/tokens/ods.*'],
          to: ['./tokens'],
        },
      ]
    }),
  ]
}).catch(() => process.exit(1));
