import React from 'react'

import Icon from './Icon'

import './media/javascript.svg'
import './media/react.svg'
import './media/nodejs.svg'

const App = () => (
  <div>
    <p>
      This app will create a sprite of only the SVGs referenced by the Icon
      component.
    </p>
    <div>
      <Icon id="javascript" />
      <Icon id="react" />
      <Icon id="nodejs" />
    </div>
  </div>
)

export default App
