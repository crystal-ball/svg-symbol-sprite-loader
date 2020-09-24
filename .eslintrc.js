'use strict'

const eloquence = require('eslint-config-eloquence')

const configs = eloquence({ target: 'node', enableESM: false, enableTS: false })
configs.overrides.push({
  files: ['src/browser/**/*'],
  parserOptions: {
    sourceType: 'module',
  },
})

module.exports = configs
