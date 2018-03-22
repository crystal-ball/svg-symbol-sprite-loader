const { interpolateName } = require('loader-utils')
const Chunk = require('webpack/lib/Chunk')
const { ConcatSource } = require('webpack-sources')

const SpriteStore = require('./sprite-store')

// Class acts as the store for imported SVGs
const spriteStore = new SpriteStore()

const getSpriteContent = () =>
  `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position: absolute; width: 0; height: 0">${spriteStore.getSpriteContent()}</svg>`

/**
 * The plugin handles:
 * 1. Merging plugin configuration with default configs
 * 1. Managing access to icon store
 * 1. Updating build chunks to update build manifest
 * 1. Inserting sprite file into build output assets
 */
module.exports = class SVGSymbolSpritePlugin {
  /**
   * Method is statically available so loader can add each imported SVG to store
   * without creating a plugin instance
   */
  static getStore() {
    return spriteStore
  }
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

    // loader-utils only supports [hash] interpolation
    const { filename } = this.options
    if (filename.includes('[chunkhash]')) {
      this.options.filename = filename.replace('[chunkhash]', '[hash]')
    }
  }

  /**
   * `apply` method is called once by webpack during plugin install, use it to set
   * event hooks on the compiler.
   */
  apply(compiler) {
    /* eslint-disable no-param-reassign */
    const { filename } = this.options
    let resourcePath

    compiler.hooks.compilation.tap('SVGSymbolSprite', compilation => {
      // During the additional assets compilation hook, generate the sprite content
      // and append it to the compilation assets.
      // ℹ️ This is where the sprite file is created
      compilation.hooks.additionalAssets.tapAsync('SVGSymbolSprite', callback => {
        // compilation.plugin('additional-assets', callback => {
        // Create sprite content
        const content = getSpriteContent()
        // Use interpolateName to allow for file name hashing based on content
        resourcePath = interpolateName({}, filename, { content })

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

      if (this.options.injectSpritePath) {
        // Unless deactivated, look for JS assets with the constant target to inject
        // the sprite path as a variable that can then be used in the
        // icon-sprite-loader
        compilation.hooks.optimizeChunkAssets.tapAsync(
          'SVGSymbolSprite',
          (chunks, callback) => {
            chunks.forEach(chunk => {
              chunk.files.forEach(file => {
                if (file.includes('.js') && !file.includes('.map')) {
                  const { publicPath } = compiler.options.output
                  const spritePath = `${publicPath || ''}${resourcePath}`

                  compilation.assets[file] = new ConcatSource(
                    `/* ICON_SPRITE_PATH injected by svg-symbol-sprite plugin */\nconst ICON_SPRITE_PATH = "${spritePath}";`,
                    '\n',
                    compilation.assets[file]
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
