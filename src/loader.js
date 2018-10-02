const { getOptions } = require('loader-utils')

const spriteStore = require('./sprite-store')

/**
 * The loader handles:
 * 1. Transforming each imported SVG into a valid JS export.
 * 1. Adding the imported SVG into the sprite store.
 */
module.exports = function svgSymbolSpriteLoader(source) {
  const { resourcePath } = this
  const options = getOptions(this)

  // Sprite store returns data about added sprite that we use as the JS export value
  const svgData = spriteStore.addSVG(resourcePath, source)

  // If a template was configured for the loader, call it with svgData to get
  // module value, otherwise return raw data as export
  return options && options.loaderTemplate
    ? options.loaderTemplate(svgData)
    : `export default ${JSON.stringify(svgData)};`
}
