const Chunk = require('webpack/lib/Chunk')
const { ConcatSource } = require('webpack-sources')
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
        filename: 'icon-sprite.svg',
        /** By default the sprite path is injected as a constant */
        injectSpritePath: true,
      },
      options
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
          // loader-utils only supports [hash] interpolation, but that is confusing
          // because most other webpack filenames use either chunkhash or more
          // accurately in this case contenthash
          filename.replace(/contenthash|chunkhash/, 'hash'),
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

      /*
       * Unless disabled, walk through all of the generated chunk's files and if the
       * icon-sprite-loader has been included replace the ICON_SPRITE_PATH_TARGET
       * with the complete path to the generated sprite.
       *
       * 🤔 This is the hackiest part of this operation. Not sure if there is a
       * "right" way to inject some value like this after the compilation...
       */
      if (this.options.injectSpritePath) {
        compilation.hooks.optimizeChunkAssets.tapAsync(
          'SVGSymbolSprite',
          (chunks, callback) => {
            chunks.forEach(chunk => {
              chunk.files.forEach(file => {
                // Only replace value in js files that aren't sourcemaps
                if (file.includes('.js') && !file.includes('.map')) {
                  const { publicPath } = compiler.options.output
                  const spritePath = `${publicPath || ''}${resourcePath}`

                  // Use ConcatSource b/c it seems to be a legit webpack utility for
                  // mutating sources that will hopefully ensure all of the required
                  // info is preserved...
                  compilation.assets[file] = new ConcatSource(
                    compilation.assets[file]
                      .source()
                      .replace('ICON_SPRITE_PATH_TARGET', spritePath),
                    '\n'
                  )
                }
              })
            })

            callback()
          }
        )
      }
    })
  }
}

// If needed in the near future, this works to inject something into the
// HTML using the html webpack plugin
// compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync(
//   'svg-symbol-sprite-loader',
//   (htmlPluginData, callback) => {
//     const newTag = {
//       tagName: 'script',
//       closeTag: true,
//       attributes: {
//         type: 'text/javascript',
//       },
//       innerHTML: `console.log('hello! ', "${resourcePath}")`,
//     }

//     htmlPluginData.body.push(newTag)

//     callback(null, htmlPluginData)
//   }
// )
