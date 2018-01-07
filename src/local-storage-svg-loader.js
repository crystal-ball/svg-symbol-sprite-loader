/* eslint-env browser */
const { localStorage } = window

/**
 * Function uses a spritePath as a unique identifier for fetching and caching an
 * SVG sprite in local storage.
 */
module.exports = spritePath => {
  // If you're in the <5% without local storage, I'm sorry
  if (!localStorage || !localStorage.getItem) return

  if (localStorage.getItem('SVG_SPRITE_VERSION') === spritePath) {
    // Current version is in localStorage, get it and inject it
    document.body.insertAdjacentHTML(
      'afterbegin',
      localStorage.getItem('SVG_SPRITE_DATA'),
    )
  } else {
    fetch(spritePath)
      .then(res => {
        if (!res.ok) throw new Error(res.statusText)
        return res
      })
      .then(res => res.text())
      .then(svgSprite => {
        document.body.insertAdjacentHTML('afterbegin', svgSprite)
        // Add version and data to localstorage for subsequent fetches 🎉
        localStorage.setItem('SVG_SPRITE_VERSION', spritePath)
        localStorage.setItem('SVG_SPRITE_DATA', svgSprite)
      })
      .catch(err => console.warn(`SVG sprite fetch failure: ${err.message}`))
  }
}
