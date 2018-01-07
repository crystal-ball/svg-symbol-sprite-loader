<h1 align="center">Ultimate SVG Icon System 🎉</h1>

<p align="center">
  <a href="https://github.com/prettier/prettier">
    <img src="https://img.shields.io/badge/styled_with-prettier-ff69b4.svg" alt="Prettier">
  </a>
  <a href="https://www.npmjs.com/package/svg-symbol-sprite-loader">
    <img src="https://img.shields.io/npm/v/svg-symbol-sprite-loader.svg" alt="Module version">
  </a>
  <a href="http://commitizen.github.io/cz-cli/">
    <img src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg" alt="Commitizen">
  </a>
</p>

This project provides a set of utilities for efficiently creating a fully
featured SVG icon system within a React+webpack project. The included loader and
plugin can be used to automatically generate an SVG symbol sprite from _only_
the SVG icons you use in your project.

<ul>
  <li><a href="#base">Base feature set configuration guide</a></li>
  <li><a href="#complete">⭐️ Complete feature set configuration guide</a></li>
  <li><a href="#system">ℹ️ SVG icon system details and motivations</a></li>
</ul>

### Included utiltiies

1. webpack loader `svg-symbol-sprite-loader` that allows importing SVG files
   into a webpack project.
1. webpack plugin that aggregates the imported SVGs into a separate `<symbol>`
   sprite file and emits it as a build asset.
1. _Optional_ `local-storage-svg-loader.js` that will fetch an SVG sprite and
   save it to local storage using the asset id. On subsequent visits to your
   application if the sprite id hasn't changed the sprite will be served from
   local storage.

## Install

```sh
npm install svg-symbol-sprite-loader
```

<h2 id="base">Base feature set configuration guide</h2>

⚠️ The below example covers the bare minimum configuration required to generate
an `icon-sprite.svg` file. The filename is not hashed, and you would need to
manually change the filename whenever you want to bust the cached sprite.

```javascript
// webpack.config.js
const SVGSymbolSpritePlugin = require('svg-symbol-sprite-loader/src/plugin')

module.exports = {
  module: {
    rules: [
      {
        // The loader transforms imported SVGs into single line comments that will
        // be stripped out during minification.
        test: /\.svg$/,
        use: [{ loader: 'svg-symbol-sprite-loader' }],
      },
    ],
  },

  plugins: [
    // The plugin generates the sprite asset and injects it into the webpack output
    new SVGSymbolSpritePlugin({
      filename: 'icon-sprite-01.svg',
    }),
  ],
}
```

And in your application, use the local storage sprite loader with the filename.

```javascript
import iconSpriteLoader from 'svg-symbol-sprite-loader/sprite-loader'

iconSpriteLoader('icon-sprite-01.svg')

// ... somewhere in your applicaiton
import './media/icon.svg'
import './media/another-icon.svg'
```

<h2 id="complete">⭐️ Complete feature set configuration guide</h2>

COMING SOON...

<h2 id="system">ℹ️ SVG icon system details and motivations</h2>

* An svg symbol sprite is very effective for creating an icon system. It allows
  you to reference an svg by id without including viewbox attributes.
* Caching in local storage is performant and reduces occurences of icon flash

## Contributing 😃

All contributions are greatly appreciated 👍🎉. To contribute please:

* Review the repo [Code of Conduct][conduct], it is **not** just for show!
* Review the [Contributing Guide][contributing] for a helpful code overview and
  repository pull request process details.

## Thank You 🙏

<div>
  <em>
    Repo icon made by
    <a href="https://www.flaticon.com/authors/smartline" title="Smartline">Smartline
    </a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com
    </a> is licensed by
    <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">
    CC 3.0 BY</a>
  </em>
</div>

<!-- Links -->

[conduct]: ./CODE_OF_CONDUCT.md
[contributing]: ./CONTRIBUTING.md

## TODO:

* Is adding chunks to the asset successful in getting it added to the manifest?
  If so, is it ok to use chunk 0?
* If chunks adds to manifest, include example with using the
  local-storage-loader with the manifest entry
* Allow for configuring componentMatch for multiple icon sources
