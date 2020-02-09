'use strict'

module.exports = {
  root: true,
  extends: 'eloquence/node',

  overrides: [
    {
      files: ['*.spec.js'],
      parserOptions: {
        // Using Babel parser allows writing tests as ESModules now
        sourceType: 'script',
      },
    },
  ],
}
