import React from 'react'

import Icons from './Icons'

const App = () => (
  <div>
    <p>
      Only the icons imported by the app will be included in the final SVG sprite.
    </p>
    <div>
      <Icons.JavaScript />
      <Icons.Bootstrap />
      <Icons.NodeJS className="radical" />
    </div>
  </div>
)

export default App
