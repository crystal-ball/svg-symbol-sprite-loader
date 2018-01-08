## Base feature set configuration guide

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
