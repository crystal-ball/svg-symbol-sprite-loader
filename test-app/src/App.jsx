import React from 'react'

import Icon from './Icon'

import JavaScriptIcon from './media/javascript.svg'
import BootstrapIcon from './media/bootstrap.svg'
import NodeJSIcon from './media/nodejs.svg'

const App = () => (
  <div>
    <p>
      Only the icons imported by the app will be included in the final SVG sprite.
    </p>
    <div>
      <Icon icon={JavaScriptIcon} />
      <Icon icon={BootstrapIcon} />
      <Icon icon={NodeJSIcon} />
    </div>
  </div>
)

export default App
