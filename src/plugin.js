const { interpolateName } = require('loader-utils')
const Chunk = require('webpack/lib/Chunk')

const SpriteStore = require('./sprite-store')

// Class acts as the store for imported SVGs
const spriteStore = new SpriteStore()

const getSpriteContent = () => {
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position: absolute; width: 0; height: 0">${spriteStore.getSpriteContent()}</svg>`
}

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
        /** The `chunkName` defintes the name of the manifest entry */
        chunkName: 'icon-sprite',
        /** When true, inject a chunk into webpack chunks */
        injectChunk: false,
        /** When true, inject `SVG_SYMBOL_SPRITE_ID` into `window` */
        injectSpriteId: true,
      },
      options,
    )
  }

  /**
   * `apply` method is called once by webpack during plugin install, use it to set
   * event hooks on the compiler.
   */
  apply(compiler) {
    /* eslint-disable no-param-reassign */
    const { filename, chunkName } = this.options

    compiler.plugin('this-compilation', compilation => {
      compilation.plugin('additional-assets', callback => {
        // Generate interpolated name with content source for hashing
        const content = getSpriteContent()
        const resourcePath = interpolateName({}, filename, { content })

        // This plugin purposely does not handle fetching the generated sprite.
        // Instead we ensure that our emitted file is included in the build manifest
        // and allow consumer to decide how to fetch+cache sprite.
        // The manifest will not include the file unless it has a corresponding
        // 'chunk' to reference so we create a chunk and include the sprite as a file
        // in the chunk.
        const svgChunk = new Chunk(chunkName)
        svgChunk.ids = []
        svgChunk.files.push(resourcePath)
        compilation.chunks.push(svgChunk)

        compilation.assets[resourcePath] = {
          source() {
            return content
          },
          size() {
            return content.length
          },
        }

        callback() // We're done 🎉
      })

      compilation.plugin(
        'html-webpack-plugin-alter-asset-tags',
        (htmlPluginData, callback) => {
          // Generate interpolated name with content source for hashing
          const content = getSpriteContent()
          const resourcePath = interpolateName({}, filename, { content })

          // Add script tag with hashed resource id
          htmlPluginData.head.push({
            tagName: 'script',
            closeTag: true,
            attributes: {
              type: 'text/javascript',
            },
            innerHTML: `window.SVG_SYMBOL_SPRITE_ID = "${resourcePath}"`,
          })

          callback(null, htmlPluginData) // We're done 🎉
        },
      )
    })
  }
}
