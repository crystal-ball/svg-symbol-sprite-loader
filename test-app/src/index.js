import React from 'react'
import ReactDOM from 'react-dom'
import svgSymbolSpriteLoader from 'svg-symbol-sprite-loader'

import App from './App'

// The icon sprite loader will fetch and cache the SVG sprite in local storage
// Always fetch sprite in lower envs and use local storage cache in production
svgSymbolSpriteLoader({ useCache: process.env.NODE_ENV === 'production' })

ReactDOM.render(<App />, document.getElementById('root'))
