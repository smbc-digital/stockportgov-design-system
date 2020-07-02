'use strict'

const gulp = require('gulp')
const taskArguments = require('./task-arguments')
const del = require('del')

// Clean task for a specified folder --------------------
// Removes all old files
// ------------------------------------------------------

gulp.task('clean', () => {
  const destination = taskArguments.destination

  return del([
    `${destination}/**/*`
  ])
})
