/* eslint-env node */
import React from 'react'
import ReactDOM from 'react-dom'
import localStorageSVGLoader from 'svg-symbol-sprite-loader/src/local-storage-svg-loader'

import App from './App'

localStorageSVGLoader(window.SVG_SYMBOL_SPRITE_ID)

ReactDOM.render(<App />, document.getElementById('root'))
