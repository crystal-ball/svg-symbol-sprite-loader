import React from 'react'

import Icon from './Icon'

import './media/javascript.svg'
import './media/react.svg'
import './media/nodejs.svg'

const App = () => (
  <div>
    <p>
      Only the icons imported by the app will be included in the final SVG sprite.
    </p>
    <div>
      <Icon id="javascript" />
      <Icon id="react" />
      <Icon id="nodejs" />
    </div>
  </div>
)

export default App
