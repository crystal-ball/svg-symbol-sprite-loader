<h1 align="center">
  <img
    src="https://cdn.rawgit.com/crystal-ball/svg-symbol-sprite-loader/master/icon.png"
    role="presentation"
    width="40"
    height="40"
  />
  &nbsp;
  SVG Symbol Sprite
  <br/>
  <small><em>Ultimate SVG Icon System</em></small>
</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/svg-symbol-sprite-loader">
    <img src="https://img.shields.io/npm/v/svg-symbol-sprite-loader.svg" alt="Module version">
  </a>
  <a href="https://travis-ci.com/crystal-ball/svg-symbol-sprite-loader">
    <img src="https://travis-ci.com/crystal-ball/svg-symbol-sprite-loader.svg?branch=master" alt="Build">
  </a>
  <a href="https://greenkeeper.io/" target="_blank" rel="noopener noreferrer">
    <img src="https://badges.greenkeeper.io/crystal-ball/svg-symbol-sprite-loader.svg" alt="Greenkeeper badge"/>
  </a>
  <a href="https://github.com/prettier/prettier" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/styled_with-prettier-ff69b4.svg" alt="Prettier">
  </a>
  <a href="https://github.com/semantic-release/semantic-release" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg" alt="managed by semantic release">
  </a>
</p>

This project includes a webpack loader and plugin that can be used with the icon
sprite loader to create a performant process for creating SVG sprites.

<ul>
  <li><a href="#complete">Configuration guide</a></li>
  <li><a href="#system">SVG icon system motivation</a></li>
</ul>

## Install

```sh
npm install svg-symbol-sprite-loader
```

<h2 id="complete">Configuration guide</h2>

The _ultimate_ SVG icon system follows this workflow:

1.  SVGs are imported into your application using the webpack loader, they can be
    referenced by their ID.
1.  The imported SVGs are deduped, sorted, hashed and extracted by the webpack
    plugin.
1.  The package exports a localstorage cache loader for browser bundles that will
    import the emitted sprite. If the sprite contents change, the filename hash will
    change and the sprite loader will fetch the latest sprite.

_ℹ️ See the [test application](./test-app) for a complete application example_

<h4 align="center">1. Configure - webpack.config.js</h4>

```javascript
const SVGSymbolSprite = require('svg-symbol-sprite-loader')
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
      // The plugin will append a script with the sprite hash to head
      // ⚠️ Order matters, the HTML plugin must be included before the SVG sprite
      // plugin so that the HTML plugin hooks are registered!
      new HtmlWebpackPlugin(),

      // The plugin extracts the imported SVGs into a separate sprite file,
      // defaults to icon-sprite.[contenthash].svg
      new new SVGSymbolSprite.Plugin(),
    ],
  }
}
```

<h4 align="center">2. Fetch - application source</h4>

```javascript
import svgSymbolSpriteLoader from 'svg-symbol-sprite-loader'

// Call the sprite loader to fetch and cache the latest SVG sprite.
svgSymbolSpriteLoader()
```

<h4 align="center">3. Import - application source</h4>

```javascript
import iconOne from './media/icon-one.svg'

  // ...
export default () => (
  <svg>
    <use href={`#${iconOne.id}`}>
  </svg>
)
```

<h2 id="system">SVG icon system motivation</h2>

* Sprite only the SVG icons imported into your application.
* Use local storage to cache sprites by content hash and only fetch a sprite when
  its content has changed.
* Load sprites from CDN locations without the CORS issues of relative SVG imports.
* Symbol sprites are very effective for creating an icon system. They allows svgs to
  be referenced by id, and don't require including viewbox attributes.

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
