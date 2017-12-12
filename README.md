# SVG Symbol Sprite Loader

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![npm](https://img.shields.io/npm/v/npm.svg)](https://www.npmjs.com/package/svg-symbol-sprite-loader)

This webpack loader aggregates imported SVGs into a separate `<symbol>` sprite
file. An svg symbol sprite is very effective for creating an icon system, and
using a loader to bundle imported SVGs makes it simple to dynamically create a
sprite that only includes SVGs used in your application 🎉.

This repository includes an **optional** `local-storage-svg-loader.js` that will
fetch an SVG sprite at the configured url and save it to local storage using the
url as an id. On subsequent visits to your application if the sprite id hasn't
changed the sprite will be served from local storage.

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

## Install

```sh
npm install svg-symbol-sprite-loader
```

## Configure

⚠️ The below example covers the bare minimum configuration required to generate
an `icon-sprite.svg` file at your build output destination. It does not
configure your application to consume the sprite.

✅ See the `/example` directory for a real world usage example that generates a
hashed file for cache busting that is fetched+stored in local storage.

```javascript
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
      filename: 'icon-sprite.svg',
    }),
  ],
}
```

## Contributing 😃

All contributions are greatly appreciated 👍🎉. To contribute please:

* Review the repo [Code of Conduct][conduct], it is **not** just for show!
* Review the [Contributing Guide][contributing] for a helpful code overview and
  repository pull request process details.

<!-- Links -->

[conduct]: ./CODE_OF_CONDUCT.md
[contributing]: ./CONTRIBUTING.md
