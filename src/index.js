'use strict'

const loader = require('./loader')
const plugin = require('./plugin')

loader.Plugin = plugin

module.exports = loader
