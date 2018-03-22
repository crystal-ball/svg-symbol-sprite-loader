const cheerio = require('cheerio')
const { interpolateName } = require('loader-utils')

/**
 * The SpriteStore handles transforming and adding SVGs to an internal store by id.
 * SVGs are transformed to `<symbol>` elements with the SVG filename as the element
 * id.
 *
 * When getting the icon set from the store the set is alphabetized (and inherently
 * unique) so that content hashes are not affected by import order.
 */
module.exports = class SpriteStore {
  constructor() {
    this.icons = {}
  }
  /**
   * Handle transforming SVG for use in a sprite and add to internal store
   * @param {string} resourcePath
   * @param {string} svg
   * @return {Object} SVG meta data returned for loader including id
   */
  addSVG(resourcePath, svg) {
    // Use interpolate name to pull the file name out of the resource path and use
    // it as the svg symbold id
    const id = interpolateName({ resourcePath }, '[name]', { content: '' })

    const $ = cheerio.load(svg)
    const $svg = $('svg')
    const svgHTML = $svg.html()
    const viewBox = $svg.attr('viewBox')

    this.icons[id] = `<symbol viewbox="${viewBox}" id="${id}">${svgHTML}</symbol>`

    // return the SVG meta, which currently is just id
    return { id }
  }
  /**
   * Handle returning total set of SVGs as a single content string
   */
  getSpriteContent() {
    // Sort keys alphabetically before reducing content to ensure consistent hashes
    // for the same set of ideas (guarantee deterministic id order)
    return Object.keys(this.icons)
      .sort()
      .reduce((prev, curr) => prev + this.icons[curr], '')
  }
}
