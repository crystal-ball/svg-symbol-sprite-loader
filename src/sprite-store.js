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
class SpriteStore {
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

    // If a viewbox has not been defined on an SVG, use the width and height attrs
    // to create one
    let viewBox = $svg.attr('viewBox')
    if (!viewBox) {
      const width = $svg.attr('width')
      const height = $svg.attr('height')
      viewBox = `0 0 ${width} ${height}`
    }

    this.icons[id] = `<symbol viewbox="${viewBox}" id="${id}">${svgHTML}</symbol>`

    // return the SVG meta, which currently is just id
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
    return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position: absolute; width: 0; height: 0">${Object.keys(
      this.icons
    )
      .sort()
      .reduce((prev, curr) => prev + this.icons[curr], '')}</svg>`
  }
}

// Export singleton for use by loader and plugin. (If multiple sprites are needed
// this class will need to be updated to store icons by a sprite namespace)
module.exports = new SpriteStore()
