'use strict'

const paths = require('./config/paths.json')
const gulp = require('gulp')
const taskListing = require('gulp-task-listing')
const taskArguments = require('./tasks/gulp/task-arguments')

// Gulp sub-tasks
require('./tasks/gulp/clean.js')
require('./tasks/gulp/lint.js')
require('./tasks/gulp/compile-assets.js')

// All test combined --------------------
// Runs js, scss and accessibility tests
// --------------------------------------
gulp.task('test', gulp.series(
  'scss:lint',
  'scss:compile'
))

// Umbrella scripts tasks for preview ---
// Runs js lint and compilation
// --------------------------------------
gulp.task('scripts', gulp.series(
  'js:compile'
))

// Umbrella styles tasks for preview ----
// Runs js lint and compilation
// --------------------------------------
gulp.task('styles', gulp.series(
  'scss:lint',
  'scss:compile'
))

// Copy assets task ----------------------
// Copies assets to taskArguments.destination
// --------------------------------------
gulp.task('copy:assets', async () => {
  const assetLocations = [
    {
      src: paths.src + 'assets/**/*',
      destination: taskArguments.destination + '/assets/'
    },
    {
      src: paths.FontAwesome + 'webfonts/**/*',
      destination: taskArguments.destination + '/assets/fonts/font-awesome'
    }
  ]

  return assetLocations.forEach(asset => {
    gulp.src(asset.src)
      .pipe(gulp.dest(asset.destination))
      .on('error', console.log)
  })
})

// Copy assets task for local -----------
// Copies files to
// taskArguments.destination (public)
// --------------------------------------
gulp.task('copy-assets', gulp.series(
  'styles',
  'scripts'
))

// Build dist task -----------------
// Compile scss into css
// -------------------------------------
gulp.task('build:dist', gulp.series(
  'clean',
  'styles',
  'scripts',
  'copy:assets'
))

// Default task -------------------------
// Lists out available tasks.
// --------------------------------------
gulp.task('default', taskListing)
