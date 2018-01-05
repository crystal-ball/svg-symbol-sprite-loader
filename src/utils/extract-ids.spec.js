import extractIds from './extract-ids'

const source = `import React from 'react'

import Icon from './Icon'

const App = () => (
  <div>
    <p>
      This app will create a sprite of only the SVGs referenced by the Icon
      component.
      <Icon id="javascript" />
      <Icon id="react" />
      <Icon id="webpack" />
    </p>
  </div>
)

export default App`

test('appends an import for every component instance', () => {
  const result = extractIds(source, { importPath: 'media/icons' })

  expect(result.includes("import 'media/icons/javascript.svg'")).toBeTruthy()
  expect(result.includes("import 'media/icons/react.svg'")).toBeTruthy()
  expect(result.includes("import 'media/icons/webpack.svg'")).toBeTruthy()
})

test('does not 💥 when a component is not in the source', () => {
  const noIconSource = `import React from 'react'

import Icon from './Icon'

const App = () => (
  <div>
    <p>
      This app will create a sprite of only the SVGs referenced by the Icon
      component.
    </p>
  </div>
)

export default App`
  const result = extractIds(noIconSource, { importPath: 'media/icons' })

  expect(result).toBe(result)
})
