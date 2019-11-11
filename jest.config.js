'use strict'

module.exports = {
  // Provides nice test output of what's being run
  verbose: true,

  // OS notifications of test results is an opt in feature, enable by setting
  // a truthy env value in your shell environment
  notify: Boolean(process.env.ENABLE_JEST_NOTIFICATIONS),

  testEnvironment: 'node',

  // Ignore Cypress acceptance tests
  testPathIgnorePatterns: ['/node_modules/'],

  // Collect test coverage of source files (excluding stories), report
  // text-summary for devs and lcov for reporting to Code Climate in CI/CD envs.
  collectCoverage: true,
  coverageReporters: ['text-summary', 'lcov'],
  collectCoverageFrom: ['src/**/*.js'],
}
