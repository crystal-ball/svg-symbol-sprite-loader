const { getOptions } = require('loader-utils')

const SVGStore = require('./plugin')
const extractIds = require('./utils/extract-ids')

/**
 * The loader handles:
 * 1. Transforming each imported SVG into JS (each file is a comment that will be
 *    stripped during production minification).
 * 1. Adding the imported SVG into the plugin store.
 */
module.exports = function loader(source) {
  const { resourcePath } = this
  const options = getOptions(this) || {}

  if (options.importPath) {
    return extractIds(source, options)
  }

  // Add the SVG to the plugin store to be emitted in the sprite
  SVGStore.getStore().addSVG(resourcePath, source)

  // Return only a comment that will be stripped out in prod builds
  return '// empty (svg-symbol-sprite-loader)'
}
