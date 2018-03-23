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
  <li><a href="#complete">⭐️ Complete feature set configuration guide</a></li>
  <li><a href="#system">ℹ️ SVG icon system details and motivations</a></li>
</ul>

## Install

[![Greenkeeper badge](https://badges.greenkeeper.io/crystal-ball/svg-symbol-sprite-loader.svg)](https://greenkeeper.io/)

```sh
npm install svg-symbol-sprite-loader
```

<h2 id="complete">⭐️ Complete feature set configuration guide</h2>

The _ultimate_ SVG icon system follows this workflow:

1.  The `svg-symbol-sprite-loader` allows importing svg icon files into your
    application.
1.  The loader coordinates with the package plugin to aggregate, dedupe and
    order imported icons for consisten sprite contents. At the end of your build
    this sprite is hashed for cache busting and emitted as an asset.
1.  The hashed sprite filename is included in your build manifest, this is used
    to check if the sprite contents have been changed. If the sprite contents
    are the same they are loaded from local storage.
1.  If the sprite contents have changed the `local-storage-loader` fetches the
    latest sprite and caches it in local storage.
1.  Your sprite is injected into the page, allowing you to easily use ids to
    reference your icons anywhere 🎉

<h4 align="center">1. Configure - webpack.config.js</h4>

```javascript
const SVGSymbolSpritePlugin = require('svg-symbol-sprite-loader/src/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const InlineChunkManifestHtmlWebpackPlugin = require('inline-chunk-manifest-html-webpack-plugin')

module.exports = {

  // ...

  module: {
    rules: [
      {
        // The loader transforms imported SVGs into single line comments that will
        // be stripped out during minification.
        test: /\.svg$/,
        use: [{ loader: 'svg-symbol-sprite-loader' }],
      },
      // ...
    ],
  },

    plugins: [
      // Extracts the imported SVGs into a separate sprite file
      new SVGSymbolSpritePlugin({
        filename: 'icon-sprite.[chunkhash].svg',
      }),

      // Extract the webpack manifest into a separate JSON file
      new ManifestPlugin(),

      // Inline the manifest JSON file into index head
      new InlineChunkManifestHtmlWebpackPlugin(),

      // Generates index.html and injects script and style tags
      new HtmlWebpackPlugin(),
    ],
  }
}
```

<h4 align="center">2. Fetch - index.js</h4>

```javascript
import localStorageLoader from 'svg-symbol-sprite-loader/local-storage-loader'

// Call the local storage loader with the cached asset id from the manifest
localStorageLoader(window.webpackManifest['icon-sprite.svg'])
```

<h4 align="center">3. Import - component.jsx</h4>

```javascript
import './media/icon-one.svg'

  // ...

  <svg>
    <use href="icon-one">
  </svg>
```

_For a basic example of using the loader to generate a sprite see the
[Base feature set configuration guide](./example-base/README.md)_

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

https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/153

<!-- Links -->

[conduct]: ./CODE_OF_CONDUCT.md
[contributing]: ./CONTRIBUTING.md
