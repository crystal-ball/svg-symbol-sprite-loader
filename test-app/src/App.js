import React from 'react'

import Icon from './Icon'

const App = () => (
  <div>
    <h2>Only the icons imported by the app will be included in the final SVG sprite!</h2>
    <div>
      <h3>Icons from /media</h3>
      <Icon id='javascript' />
      <Icon id='bootstrap' />
      <Icon id='nodejs' className='radical' />
    </div>
    <div>
      <h3>Ionicons from node_modules</h3>
      <Icon id='md-checkmark' />
      <Icon id='md-bonfire' />
      <Icon id='md-speedometer' />
    </div>
  </div>
)

export default App
