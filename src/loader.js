const SVGStore = require('./plugin')

/**
 * The loader handles:
 * 1. Transforming each imported SVG into JS (each file is a comment that will be
 *    stripped during production minification).
 * 1. Adding the imported SVG into the plugin store.
 */
module.exports = function loader(source) {
  const { addDependency, cacheable, resourcePath } = this

  // Add the icon as a dependency ¯\_(ツ)_/¯
  addDependency(resourcePath)

  // Set the loader as not cacheable ¯\_(ツ)_/¯
  cacheable(false)

  // Add the SVG to the plugin store to be emitted in the sprite
  SVGStore.getStore().addSVG(resourcePath, source)

  // Return only a comment that will be stripped out in prod builds
  return '// empty (svg-symbol-sprite-loader)'
}
