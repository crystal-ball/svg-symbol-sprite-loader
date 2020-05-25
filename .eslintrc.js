'use strict'

const eloquence = require('eslint-config-eloquence')

const configs = eloquence({ target: 'node', esm: false })
configs.overrides.push({
  files: ['src/browser/**/*'],
  parserOptions: {
    sourceType: 'module',
  },
  rules: {
    'node/no-unsupported-features/es-syntax': 'off',
  },
})

module.exports = configs
