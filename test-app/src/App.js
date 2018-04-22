import React from 'react'

import Icon from './Icon'

const App = () => (
  <div>
    <p>
      Only the icons imported by the app will be included in the final SVG sprite.
    </p>
    <div>
      <Icon id="javascript" />
      <Icon id="bootstrap" />
      <Icon id="nodejs" className="radical" />
    </div>
  </div>
)

export default App
