import React from 'react'

import Icon from './Icon'
import Ionicon from './Ionicon'

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
    <p>Some Devicons</p>
    <div>
      <Ionicon id="ios-analytics" />
      <Ionicon id="ios-alert" />
    </div>
  </div>
)

export default App
