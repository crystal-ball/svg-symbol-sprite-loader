'use strict'

module.exports = {
  types: [
    { value: 'feat', name: '🎉 feat:       A new feature' },
    { value: 'fix', name: '👍 fix:        A bug fix' },
    {
      value: 'refactor',
      name:
        '🔩 refactor:   A code change that neither fixes a bug nor adds a feature',
    },
    {
      value: 'test',
      name: '✅ test:       Updating tests or adding missing tests',
    },
    {
      value: 'chore',
      name:
        '⚙️  chore:      Changes to the build process, development tools, project configs, etc.',
    },
    { value: 'docs', name: '📝 docs:       Documentation only changes' },
    { value: 'WIP', name: '🚧 wip:        Work in progress' },
    { value: 'revert', name: '↩️  revert:     Revert to a commit' },
  ],

  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix', 'style', 'refactor', 'perf', 'chore'],
  scopes: [{ name: 'loader' }, { name: 'plugin' }, { name: 'example' }, { name: 'deps' }],
}
