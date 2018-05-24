const Chunk = require('webpack/lib/Chunk')
const { interpolateName } = require('loader-utils')

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
        filename: 'icon-sprite.[hash].svg',
        /** By default inject sprite id into head */
        injectSpriteId: true,
      },
      options || {}
    )
  }

  /**
   * `apply` method is called once by webpack during plugin install, use it to set
   * event hooks on the compiler.
   */
  apply(compiler) {
    /* eslint-disable no-param-reassign */
    const { filename } = this.options
    let resourcePath

    // 🤔 The `compilation` hook is called twice and ends up producing an empty svg
    // sprite. The `thisCompiliation` hook is only called once. This seems to be the
    // correct hook to use ¯\_(ツ)_/¯
    compiler.hooks.thisCompilation.tap('SVGSymbolSprite', compilation => {
      // ℹ️ During additional assets hook, handle adding svg sprite to build assets
      compilation.hooks.additionalAssets.tapAsync('SVGSymbolSprite', callback => {
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
            // Same as compilation.options.output.hashDigestLength ¯\_(ツ)_/¯
            // see https://webpack.js.org/configuration/output/#output-hashdigestlength
            `[hash:${compilation.outputOptions.hashDigestLength || 20}]`
          ),
          { content }
        )

        // 🤔 adding a chunk is required to get the emitted sprite included in the
        // manifest file. There may be a better way to handle this...
        const svgChunk = new Chunk('icon-sprite')
        svgChunk.ids = []
        svgChunk.files.push(resourcePath)
        compilation.chunks.push(svgChunk)

        // The asset file is included in the webpack compilation 🎉
        compilation.assets[resourcePath] = {
          source() {
            return content
          },
          size() {
            return content.length
          },
        }

        callback()
      })
    })

    if (this.options.injectSpriteId) {
      // The alter asset tags hook is only called once during the compilation ¯\_(ツ)_/¯
      compiler.hooks.compilation.tap('SVGSymbolSprite', compilation => {
        // HTML webpack plugin hook to alter the asset tags included in generated HTML
        compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync(
          'SVGSymbolSprite',
          (data, cb) => {
            data.head.push({
              tagName: 'script',
              closeTag: true,
              attributes: { type: 'text/javascript' },
              innerHTML: `window.ICON_SPRITE_ID = "${compilation.outputOptions
                .publicPath || ''}${resourcePath}";`,
            })

            cb(null, data)
          }
        )
      })
    }
  }
}
