const plugin = require('./plugin')
const extractIds = require('./utils/extract-ids')

/**
 * The loader handles:
 * 1. Transforming each imported SVG into a valid JS export.
 * 1. Adding the imported SVG into the plugin store.
 */
module.exports = function loader(source) {
  const { resourcePath, query = {} } = this

  // Import path specifies that module imports should be injected by loader into
  // source file
  if (query.importPath) return extractIds(source, query)

  // Add the SVG to the plugin store to be emitted in the sprite
  const svgMeta = plugin.getStore().addSVG(resourcePath, source)

  // Return the SVG meta data
  return `export default ${JSON.stringify(svgMeta)}`
}
