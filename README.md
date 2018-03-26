<h1 align="center">Ultimate SVG Icon System 🎉</h1>

<p align="center">
  <a href="https://greenkeeper.io/">
    <img src="https://badges.greenkeeper.io/crystal-ball/svg-symbol-sprite-loader.svg" alt="Greenkeeper badge"/>
  </a>
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
1.  The `icon-sprite-loader` can be imported into your application to fetch and
    cache the sprite using a hashed filename. If the sprite contents change, the
    filename will change and the sprite loader will fetch the latest sprite.
1.  The sprite loader injects the sprite into the page, allowing you to easily
    use ids to reference your icons anywhere 🎉

<h4 align="center">1. Configure - webpack.config.js</h4>

```javascript
const SVGSymbolSpritePlugin = require('svg-symbol-sprite-loader/src/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {

  // ...

  module: {
    rules: [
      {
        // The loader transforms imported SVGs in JS objects of SVG data that
        // can be used with any icon component
        test: /\.svg$/,
        use: [{ loader: 'svg-symbol-sprite-loader' }],
      },
      // ...
    ],
  },

    plugins: [
      // The plugin extracts the imported SVGs into a separate sprite file
      new SVGSymbolSpritePlugin({
        filename: 'icon-sprite.[chunkhash].svg',
      }),

      // Generates index.html and injects script and style tags
      new HtmlWebpackPlugin(),
    ],
  }
}
```

<h4 align="center">2. Fetch - index.js</h4>

```javascript
import localStorageLoader from 'svg-symbol-sprite-loader/src/icon-sprite-loader'

// Call the sprite loader to fetch and cache the latest SVG sprite.
localStorageLoader()
```

<h4 align="center">3. Import - component.jsx</h4>

```javascript
import './media/icon-one.svg'

  // ...

  <svg>
    <use href="icon-one">
  </svg>
```

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
