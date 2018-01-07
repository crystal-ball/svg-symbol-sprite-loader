/* eslint-env node */
import React from 'react'
import ReactDOM from 'react-dom'
import localStorageSVGLoader from 'svg-symbol-sprite-loader/src/local-storage-svg-loader'

import App from './App'

localStorageSVGLoader(window.webpackManifest['icon-sprite.svg'])

ReactDOM.render(<App />, document.getElementById('root'))
