'use strict'

const gulp = require('gulp')
const configPaths = require('../../config/paths.json')
const sass = require('gulp-sass')
const plumber = require('gulp-plumber')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const merge = require('merge-stream')
const taskArguments = require('./task-arguments')
const rename = require('gulp-rename')
const cssnano = require('cssnano')
const rollup = require('gulp-better-rollup')
const uglify = require('gulp-uglify')
const eol = require('gulp-eol')

const errorHandler = function (error) {
  // Log the error to the console
  console.error(error.message)

  // Ensure the task we're running exits with an error code
  this.once('finish', () => process.exit(1))
  this.emit('end')
}
// different entry points for both streams below and depending on destination flag
const compileStylesheet = configPaths.src + 'all.scss'

gulp.task('scss:compile', () => {
  const compile = gulp
    .src(compileStylesheet)
    .pipe(plumber(errorHandler))
    .pipe(sass())
    .pipe(postcss([autoprefixer, cssnano]))
    .pipe(
      rename({
        basename: 'smbc-frontend',
        extname: '.min.css'
      })
    )
    .pipe(gulp.dest(taskArguments.destination + '/'))

  return merge(compile)
})

// Compile js task for preview ----------
// --------------------------------------
gulp.task('js:compile', () => {
  // for dist/ folder we only want compiled 'all.js' file
  const srcFiles = configPaths.src + 'all.js'

  return gulp
    .src([srcFiles, '!' + configPaths.src + '**/*.test.js'])
    .pipe(
      rollup({
        // Used to set the `window` global and UMD/AMD export name.
        name: 'SMBCFrontend',
        // UMD allows the published bundle to work in CommonJS and in the browser.
        format: 'umd'
      })
    )
    .pipe(uglify())
    .pipe(
      rename({
        basename: 'smbc-frontend',
        extname: '.min.js'
      })
    )
    .pipe(eol())
    .pipe(gulp.dest(taskArguments.destination))
})

// Compile vendor js task for preview ----------
// --------------------------------------
gulp.task('vendor:compile', () => {
  // for dist/ folder we only want compiled 'all.js' file
  const srcFiles = configPaths.vendor + 'all.js'

  return gulp
    .src([srcFiles, '!' + configPaths.src + '**/*.test.js'])
    .pipe(uglify())
    .pipe(
      rename({
        basename: 'govuk-frontend',
        extname: '.min.js'
      })
    )
    .pipe(eol())
    .pipe(gulp.dest(taskArguments.destination + '/vendor/'))
})
