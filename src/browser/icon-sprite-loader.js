/* eslint-env browser */
const { localStorage, ICON_SPRITE_ID } = window

/**
 * Function uses a sprite path as a unique identifier for fetching and caching an
 * SVG sprite in local storage.
 *
 * ℹ️ The ICON_SPRITE_ID will be set on window by a script tag in head injected in
 * the build if the HTML webpack plugin is being used. If the HTML plugin is not
 * being used the sprite id matching the resource path MUST be passed to the
 * function.
 *
 * ⚠️ Note that this process assumes fetch is available, so be sure to polyfill it
 * with whatwg-fetch if you support older browsers!
 */
function iconSpriteLoader({ customSpriteId, fetchOptions, useCache } = {}) {
  const spriteId = customSpriteId || ICON_SPRITE_ID

  if (
    useCache &&
    localStorage &&
    localStorage.getItem &&
    localStorage.getItem('ICON_SPRITE_ID') === spriteId
  ) {
    // Current version is in localStorage, get it and inject it
    document.body.insertAdjacentHTML(
      'afterbegin',
      localStorage.getItem('SVG_SPRITE_DATA'),
    )
  } else {
    fetch(spriteId, fetchOptions)
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText)
        return res
      })
      .then((res) => res.text())
      .then((svgSprite) => {
        document.body.insertAdjacentHTML('afterbegin', svgSprite)
        // Add version and data to localstorage for subsequent fetches 🎉
        if (localStorage && localStorage.setItem) {
          localStorage.setItem('ICON_SPRITE_ID', spriteId)
          localStorage.setItem('SVG_SPRITE_DATA', svgSprite)
        }
      })
      // eslint-disable-next-line
      .catch((err) => console.warn(`SVG sprite fetch failure: ${err.message}`))
  }
}

export default iconSpriteLoader
