const { getOptions } = require('loader-utils')

const extractIds = require('./utils/extract-ids')
const spriteStore = require('./sprite-store')

/**
 * The loader handles:
 * 1. Transforming each imported SVG into a valid JS export.
 * 1. Adding the imported SVG into the sprite store.
 */
module.exports = function svgSymbolSpriteLoader(source) {
  const { resourcePath } = this
  const options = getOptions(this)

  // Import path specifies that module imports should be injected by loader into
  // source file, THIS IS EXPERIMENTAL!
  if (options && options.importPath) return extractIds(source, options)

  // Sprite store returns data about added sprite that we use as the JS export value
  const svgData = spriteStore.addSVG(resourcePath, source)

  return `export default ${JSON.stringify(svgData)}`
}
