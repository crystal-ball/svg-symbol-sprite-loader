'use strict'

const parse5 = require('parse5')

/**
 * Recursively searches an AST for an SVG node
 * @param {Object} node AST node
 */
function findSVGNode(node) {
  if (node.tagName === 'svg') return node

  if (node.childNodes) {
    const searchedChildren = node.childNodes
      .map(findSVGNode)
      .filter(childNode => childNode)
    return searchedChildren.length ? searchedChildren[0] : null
  }

  return null
}

/**
 * The SpriteStore handles transforming and adding SVGs to an internal store by id.
 * SVGs are transformed to `<symbol>` elements with the SVG filename as the element
 * id.
 *
 * When getting the icon set from the store the set is alphabetized (and inherently
 * unique) so that content hashes are not affected by import order.
 */
class SpriteStore {
  constructor() {
    // Why use a map??? JUST FOR FUN ¯\_(ツ)_/¯
    this.icons = new Map()
  }

  /**
   * Handle transforming SVG for use in a sprite and add to internal store
   * @param {string} resourcePath
   * @param {string} svg
   * @param {string} id
   * @return {Object} SVG meta data returned for loader including id
   */
  addSVG(resourcePath, svg, id) {
    const document = parse5.parse(svg)
    const svgNode = findSVGNode(document)

    // If a viewbox has not been defined on an SVG, use the width and height attrs
    // to create one
    let viewBox = ''
    const viewBoxAttr = svgNode.attrs.find(attr => attr.name === 'viewBox')
    if (viewBoxAttr) {
      viewBox = viewBoxAttr.value
    } else {
      const width = svgNode.attrs.find(attr => attr.name === 'width')
      const height = svgNode.attrs.find(attr => attr.name === 'height')
      if (!width || !height) {
        // eslint-disable-next-line no-console
        console.warn(
          `Parsed svg from ${resourcePath} does not have a viewBox or width and height attributes!`,
        )
      } else {
        viewBox = `0 0 ${width.value} ${height.value}`
      }
    }

    // Create a <symbol /> with id and viewBox attrs, that's all we need for
    // the svg symbol sprite
    const symbol = parse5.serialize({
      nodeName: '#document',
      mode: 'quirks',
      childNodes: [
        {
          nodeName: 'symbol',
          tagName: 'symbol',
          namespaceURI: 'http://www.w3.org/1999/xhtml',
          attrs: [
            { name: 'id', value: id },
            { name: 'viewBox', value: viewBox },
          ],
          childNodes: svgNode.childNodes,
        },
      ],
    })

    this.icons.set(id, symbol)

    return { id }
  }

  /**
   * Handle returning the complete SVG sprite content string with deduped, sorted
   * icons inside.
   * @return {string} SVG symbol sprite
   */
  getSpriteContent() {
    // Sort keys alphabetically before reducing content to ensure consistent hashes
    // for the same set of ideas (guarantee deterministic id order)
    const sortedIcons = Array.from(this.icons.keys()).sort()

    // Return svg with styles set to hide the svg, it isn't meant to be shown, the
    // icons will reference the symbols inside the svg.
    return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position: absolute; width: 0; height: 0">${sortedIcons.reduce(
      (prev, curr) => prev + this.icons.get(curr),
      '',
    )}</svg>`
  }
}

// Export singleton for use by loader and plugin. (If multiple sprites are needed
// this class will need to be updated to store icons by a sprite namespace)
module.exports = new SpriteStore()
