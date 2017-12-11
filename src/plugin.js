const { interpolateName } = require('loader-utils')
const Chunk = require('webpack/lib/Chunk')

const SpriteStore = require('./sprite-store')

// Class acts as the store for imported SVGs
const spriteStore = new SpriteStore()

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
      },
      options,
    )
  }

  /**
   * `apply` method is called once by webpack during plugin install, use it to set
   * event hooks on the compiler.
   */
  apply(compiler) {
    /* eslint-disable class-methods-use-this */
    /* eslint-disable no-param-reassign */

    // 'emit' hook is called when assets are emitted? ¯\_(ツ)_/¯
    compiler.plugin('emit', (compilation, callback) => {
      const { filename, chunkName } = this.options

      const content = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position: absolute; width: 0; height: 0">${spriteStore.getSpriteContent()}</svg>`

      // Generate interpolated name
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

      // Insert the sprite into the webpack build as a new file asset:
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
  }
}
