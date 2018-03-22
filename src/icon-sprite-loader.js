/* eslint-env browser */
const { localStorage } = window

const ICON_SPRITE_PATH = 'ICON_SPRITE_PATH_TARGET'

/**
 * Function uses a sprite path as a unique identifier for fetching and caching an
 * SVG sprite in local storage.
 *
 * ℹ️ The ICON_SPRITE_PATH is replaced during the plugin execution, it can be
 * disabled by passing injectSpritePath false, but then this file will fail so don't
 * include it
 *
 * ⚠️Note that this assumes fetch is available, so be
 * sure to polyfill it with whatwg-fetch if you support older browsers!
 */
export default () => {
  if (
    localStorage &&
    localStorage.getItem &&
    localStorage.getItem('SVG_SPRITE_VERSION') === ICON_SPRITE_PATH
  ) {
    // Current version is in localStorage, get it and inject it
    document.body.insertAdjacentHTML(
      'afterbegin',
      localStorage.getItem('SVG_SPRITE_DATA')
    )
  } else {
    fetch(ICON_SPRITE_PATH)
      .then(res => {
        if (!res.ok) throw new Error(res.statusText)
        return res
      })
      .then(res => res.text())
      .then(svgSprite => {
        document.body.insertAdjacentHTML('afterbegin', svgSprite)
        // Add version and data to localstorage for subsequent fetches 🎉
        if (localStorage && localStorage.setItem) {
          localStorage.setItem('SVG_SPRITE_VERSION', ICON_SPRITE_PATH)
          localStorage.setItem('SVG_SPRITE_DATA', svgSprite)
        }
      })
      .catch(err => console.warn(`SVG sprite fetch failure: ${err.message}`))
  }
}
