'use strict'

const { basename } = require('path')
const compiler = require('./test/compiler')

// Testing setup copy-pasta'd from:
// https://webpack.js.org/contribute/writing-a-loader/#testing

describe('loader', () => {
  it('Inserts name and outputs JavaScript', async () => {
    const stats = await compiler('example.svg')
    const output = stats.toJson({ source: true }).modules[0].source

    expect(output).toBe(`export default ${JSON.stringify({ id: 'example' })}`)
  })

  it('Uses ID from symbolId option', async () => {
    const stats = await compiler('example.svg', {
      symbolId: (filePath) => `icon-${basename(filePath, '.svg')}`,
    })
    const output = stats.toJson({ source: true }).modules[0].source

    expect(output).toBe(`export default ${JSON.stringify({ id: 'icon-example' })}`)
  })
})
