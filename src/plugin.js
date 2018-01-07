const { interpolateName } = require('loader-utils')
// const Chunk = require('webpack/lib/Chunk')
// const { ConcatSource } = require('webpack-sources')

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
        /** The `chunkName` defines the name of the manifest entry */
        // chunkName: 'icon-sprite',
        /**
         * Identifier for the chunk that the global sprite id assignment source
         * should be injected into. If an identifier isn't specified, the id assignment
         * is not injected.
         */
        // spriteIdInjectionChunk: '',
        /** When true, inject a chunk into webpack chunks */
        // injectChunk: false,
        /** When true, inject `SVG_SYMBOL_SPRITE_ID` into `window` */
        // injectSpriteId: true,
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
    const { filename } = this.options

    compiler.plugin('this-compilation', compilation => {
      // During chunk asset optimization, if plugin is configured to inject the
      // generated sprite id, add the code to attach id to window
      // compilation.plugin('optimize-chunk-assets', (chunks, callback) => {
      //   chunks.forEach(chunk => {
      //     chunk.files.forEach(file => {
      //       if (!spriteIdInjectionChunk) return
      //       if (!file.match(spriteIdInjectionChunk)) return

      //       const content = getSpriteContent()
      //       const resourcePath = interpolateName({}, filename, { content })

      //       // Rewrite the file using concat to append id injection code
      //       compilation.assets[file] = new ConcatSource(
      //         '/* Begin asset id injected by svg-symbol-sprite-loader plugin ---*/\n',
      //         `;(function(){ window.SVG_SYMBOL_SPRITE_ID = "${resourcePath}" }());\n`,
      //         '/* End asset id injection ---------------------------------------*/\n',
      //         compilation.assets[file],
      //       )
      //     })
      //   })
      //   callback()
      // })

      // During the additional assets compilation hook, generate the sprite content
      // and append it to the compilation assets.
      // ℹ️ This is where the sprite file is created
      compilation.plugin('additional-assets', callback => {
        // Create sprite content
        const content = getSpriteContent()
        // Use interpolateName to allow for file name hashing based on content
        const resourcePath = interpolateName({}, filename, { content })

        compilation.assets[resourcePath] = {
          source() {
            return content
          },
          size() {
            return content.length
          },
          // name: chunkName,
          // path: resourcePath,
          // chunks: [0], // HACK to get included by manifest plugin?
        }

        callback()
      })
    })
  }
}
