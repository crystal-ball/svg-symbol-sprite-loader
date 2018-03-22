import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

fetch('icon-sprite.svg')
  .then(res => res.text())
  .then(svgSprite => {
    document.body.insertAdjacentHTML('afterbegin', svgSprite)
  })

ReactDOM.render(<App />, document.getElementById('root'))
