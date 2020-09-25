'use strict'

const util = require('util')

const sass = require('node-sass')
const sassRender = util.promisify(sass.render)

const configPaths = require('../config/paths.json')

/**
 * Render Sass
 *
 * @param {object} options Options to pass to sass.render
 * @return {promise} Result of calling sass.render
 */
function renderSass (options) {
  return sassRender({
    includePaths: [configPaths.src],
    ...options
  })
}

module.exports = { renderSass }
