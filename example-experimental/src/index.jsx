import React from 'react'
import ReactDOM from 'react-dom'
import iconSpriteLoader from 'svg-symbol-sprite-loader/src/icon-sprite-loader'

import App from './App'

// The icon sprite loader will fetch and cache the SVG sprite in local storage
iconSpriteLoader()

ReactDOM.render(<App />, document.getElementById('root'))
