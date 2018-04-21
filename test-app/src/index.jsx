import React from 'react'
import ReactDOM from 'react-dom'
import svgSymbolSpriteLoader from 'svg-symbol-sprite-loader'

import App from './App'

// The icon sprite loader will fetch and cache the SVG sprite in local storage
svgSymbolSpriteLoader()

ReactDOM.render(<App />, document.getElementById('root'))
