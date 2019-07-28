'use strict'

const { basename } = require('path')
const compiler = require('./__mocks__/compiler')

// Testing setup copy-pasta'd from:
// https://webpack.js.org/contribute/writing-a-loader/#testing
test('Inserts name and outputs JavaScript', async () => {
  const stats = await compiler('example.svg')
  const output = stats.toJson().modules[0].source

  expect(output).toBe(`export default ${JSON.stringify({ id: 'example' })}`)
})

test('Uses ID from symbolId option', async () => {
  const stats = await compiler('example.svg', {
    symbolId: filePath => `icon-${basename(filePath, '.svg')}`,
  })
  const output = stats.toJson().modules[0].source

  expect(output).toBe(`export default ${JSON.stringify({ id: 'icon-example' })}`)
})
