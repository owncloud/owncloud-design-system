import { defineConfig } from "tsup";
import { sassPlugin } from "esbuild-sass-plugin";
import copy from "esbuild-plugin-copy";
import path from "path";
import vuePlugin from "esbuild-vue";
import importGlob from "esbuild-plugin-import-glob";

export default defineConfig(({watch}) => ({
	entry: ['src/system.js'],
  outDir: 'dist/system',
	clean: !watch,
	format: ["cjs"],
	minify: !watch,
	esbuildPlugins: [
    importGlob.default(),
    sassPlugin({
      precompile(source, pathname) {
        const basedir = path.dirname(pathname);
        return source.replace(/(url\(['"]?)(\.\.?\/)([^'")]+['"]?\))/g, `$1${basedir}/$2$3`);
      }
    }),
    vuePlugin({ extractCss: true }),
    copy.default({
      assets: [
        {
          from: ["./src/assets/icons/*"],
          to: ["./icons"]
        },
        {
          from: ["./l10n/translations.json"],
          to: ["./"]
        },
        {
          from: ["./src/assets/tokens/ods.*"],
          to: ["./tokens"]
        }
      ]
    })
	]
}))
