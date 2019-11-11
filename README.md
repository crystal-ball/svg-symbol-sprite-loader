<div align="right">
  <h1>
    <img height=75 src="./docs/assets/readme-header.png" alt="Crystal Ball Projects documentation"/>
  </h1>

  <!-- prettier-ignore-start -->
  <a href="https://www.npmjs.com/package/svg-symbol-sprite-loader">
    <img src="https://img.shields.io/npm/v/svg-symbol-sprite-loader" alt="Package version" valign="text-top"/>
  </a>
  <a href="https://www.npmjs.com/package/svg-symbol-sprite-loader">
    <img src="https://img.shields.io/npm/dt/svg-symbol-sprite-loader?color=blue" alt="NPM downloads" valign="text-top" />
  </a>
  <a href="https://travis-ci.com/crystal-ball/svg-symbol-sprite-loader">
    <img src="https://travis-ci.com/crystal-ball/svg-symbol-sprite-loader.svg?branch=master" alt="Build status" valign="text-top">
  </a>
  <a href="https://snyk.io/test/github/crystal-ball/svg-symbol-sprite-loader?targetFile=package.json">
    <img src="https://snyk.io/test/github/crystal-ball/svg-symbol-sprite-loader/badge.svg?targetFile=package.json" alt="Known vulnerabilities" valign="text-top" />
  </a>
  <a href="https://codeclimate.com/github/crystal-ball/svg-symbol-sprite-loader/test_coverage">
    <img src="https://api.codeclimate.com/v1/badges/fdec537b7796321e9af2/test_coverage" alt="Test coverage" valign="text-top" />
  </a>
  <a href="https://codeclimate.com/github/crystal-ball/svg-symbol-sprite-loader/maintainability">
    <img src="https://api.codeclimate.com/v1/badges/fdec537b7796321e9af2/maintainability" alt="Maintainability" valign="text-top" />
  </a>
  <code>:status&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code>

  <br />
  <a href="https://renovatebot.com/">
    <img src="https://img.shields.io/badge/Renovate-enabled-32c3c2.svg" alt="Renovate" valign="text-top" />
  </a>
  <a href="https://commitizen.github.io/cz-cli/">
    <img src="https://img.shields.io/badge/Commitizen-%E2%9C%93%20friendly-10e67b" alt="Commitizen friendly" valign="text-top" />
  </a>
  <a href="https://github.com/crystal-ball/svg-symbol-sprite-loader#workspaces/-projects-5b88b5c9af3c0a2186966767/board?repos=113791413">
    <img src="https://img.shields.io/badge/ZenHub-managed-5e60ba.svg" alt="ZenHub" valign="text-top" />
  </a>
  <a href="https://semantic-release.gitbook.io/semantic-release/">
    <img src="https://img.shields.io/badge/%F0%9F%93%A6%F0%9F%9A%80-semantic_release-e10079.svg" alt="Semantic Release" valign="text-top"/>
  </a>
  <a href="./CODE_OF_CONDUCT.md">
    <img src="https://img.shields.io/badge/Contributor%20Covenant-v2.0-de8cf2.svg" alt="Contributor Covenant" valign="text-top" />
  </a>
  <code>:integrations</code>

  <br />
  <a href="https://github.com/crystal-ball">
    <img src="https://img.shields.io/badge/%F0%9F%94%AE%E2%9C%A8-contains_magic-D831D7.svg" alt="Contains magic" valign="text-top" />
  </a>
  <a href="https://github.com/crystal-ball/crystal-ball.github.io">
    <img src="https://img.shields.io/badge/%F0%9F%92%96%F0%9F%8C%88-full_of_love-F5499E.svg" alt="Full of love" valign="text-top" />
  </a>
  <code>:flair&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code>
  <!-- prettier-ignore-end -->

  <h1></h1>
  <br />
  <p align="center">
    <em>webpack loader and plugin for creating SVG sprites</em>
  </p>
  <br />
</div>

- [Configuration guide](#complete)
- [SVG icon system motivation](#system)

---

## Install

```sh
npm install svg-symbol-sprite-loader
```

<h2 id="complete">Configuration guide</h2>

The _ultimate_ SVG icon system follows this workflow:

1.  SVGs are imported into your application using the webpack loader, they can
    be referenced by their ID.
1.  The imported SVGs are deduped, sorted, hashed and extracted by the webpack
    plugin.
1.  The package exports a localStorage cache loader for browser bundles that
    will import the emitted sprite. If the sprite contents change, the filename
    hash will change and the sprite loader will fetch the latest sprite.

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
        use: [
          {
            loader: 'svg-symbol-sprite-loader',

            // optional: Provide a function which returns a customized symbol ID.
            // It receives the full file path as an argument
            options: {
              symbolId: filePath => `icon-${path.basename(filePath, '.svg')}`,
            },
          },
        ],
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
      new new SVGSymbolSprite.Plugin({
        filename: `icon-sprite${process.env.NODE_ENV === 'production' ? '.[chunkhash]' : ''}.svg`
      }),
    ],
  }
}
```

<h4 align="center">2. Fetch - application source</h4>

```javascript
import svgSymbolSpriteLoader from 'svg-symbol-sprite-loader'

// Call the sprite loader to fetch and cache the latest SVG sprite.
svgSymbolSpriteLoader({ useCache: process.env.NODE_ENV === 'production' })
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

- Sprite only the SVG icons imported into your application.
- Use local storage to cache sprites by content hash and only fetch a sprite
  when its content has changed.
- Load sprites from CDN locations without the CORS issues of relative SVG
  imports.
- Symbol sprites are very effective for creating an icon system. They allows
  svgs to be referenced by id, and don't require including viewbox attributes.

## Contributing 😃

All contributions are greatly appreciated 👍🎉. To contribute please:

- Review the repo [Code of Conduct][conduct], it is **not** just for show!
- Review the [Contributing Guide][contributing] for a helpful code overview and
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
[contributing]: ./.github/CONTRIBUTING.md
