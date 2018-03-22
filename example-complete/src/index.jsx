/* eslint-env node */
import React from 'react'
import ReactDOM from 'react-dom'
import iconSpriteLoader from 'svg-symbol-sprite-loader/src/icon-sprite-loader'

import App from './App'

iconSpriteLoader()

ReactDOM.render(<App />, document.getElementById('root'))
