'use strict'

// Use react linting with Node resolver b/c the eslint-webpack resolver isn't
// installed
module.exports = {
  root: true,
  extends: 'eloquence/react',

  settings: {
    'import/resolver': 'node',
  },

  rules: {
    'import/no-unresolved': 'off',
  },
}
