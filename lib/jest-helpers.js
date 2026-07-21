'use strict'

const sass = require('sass')
const configPaths = require('../config/paths.json')

/**
 * Render Sass
 *
 * @param {object} options Options to pass to sass.render
 * @return {promise} Result of calling sass.render
 */
function renderSass (options) {
  return new Promise((resolve, reject) => {
    sass.render({
      includePaths: [configPaths.src],
      ...options
    }, (err, result) => {
      if (err) {
        return reject(err)
      }
      resolve(result)
    })
  })
}

module.exports = { renderSass }
