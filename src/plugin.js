'use strict'

const { RawSource } = require('webpack-sources')
const { interpolateName } = require('loader-utils')
const HtmlWebpackPlugin = require('safe-require')('html-webpack-plugin')

const spriteStore = require('./sprite-store')

/**
 * The SVG symbol sprite plugin is responsible for generating the SVG sprite asset
 * and including it in the compilation assets.
 */
module.exports = class SVGSymbolSpritePlugin {
  /**
   * Merge default options with plugin configuration
   */
  constructor(options) {
    this.options = Object.assign(
      {
        /** The `filename` defines the name of the emitted asset */
        filename: 'icon-sprite.svg',
        /** By default inject sprite id into head */
        injectSpriteId: true,
      },
      options || {},
    )
  }

  /**
   * `apply` method is called once by webpack during plugin install, use it to set
   * event hooks on the compiler.
   */
  apply(compiler) {
    const { filename } = this.options
    let resourcePath

    // 🤔 The `compilation` hook is called twice and ends up producing an empty svg
    // sprite. The `thisCompiliation` hook is only called once. This seems to be the
    // correct hook to use ¯\_(ツ)_/¯
    compiler.hooks.thisCompilation.tap('SVGSymbolSprite', (compilation) => {
      // ℹ️ During additional assets hook, handle adding svg sprite to build assets
      compilation.hooks.additionalAssets.tap('SVGSymbolSprite', () => {
        // Get sprite content returns full svg symbol sprite ready for application
        const content = spriteStore.getSpriteContent()

        // Use interpolateName to allow for file name hashing based on content
        resourcePath = interpolateName(
          {},
          // CREATE A FILE NAME WITH HELLAS REGEX:
          // 1. Normalize to [hash]
          // 2. Inject default digest hash length if not there
          // loader-utils only supports [hash] interpolation, but that is confusing
          // because most other webpack filenames use either chunkhash or more
          // accurately in this case contenthash
          filename.replace(/contenthash|chunkhash/, 'hash').replace(
            // ℹ️ This will only match if a digest length hasn't been set
            /\[hash\]/,
            // see https://webpack.js.org/configuration/output/#output-hashdigestlength
            `[hash:${compilation.outputOptions.hashDigestLength}]`,
          ),
          { content },
        )

        compilation.emitAsset(resourcePath, new RawSource(content))
      })
    })

    if (this.options.injectSpriteId) {
      // The alter asset tags hook is only called once during the compilation ¯\_(ツ)_/¯
      compiler.hooks.compilation.tap('SVGSymbolSprite', (compilation) => {
        // HTML webpack plugin hook to alter the asset tags included in generated HTML
        HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync(
          'SVGSymbolSprite',
          (data, cb) => {
            data.headTags.push({
              tagName: 'script',
              voidTag: false,
              attributes: { type: 'text/javascript' },
              innerHTML: `window.ICON_SPRITE_ID = "${
                compilation.outputOptions.publicPath || ''
              }${resourcePath}";`,
            })

            cb(null, data)
          },
        )
      })
    }
  }
}
