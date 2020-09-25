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
const concat = require('gulp-concat')

const errorHandler = function (error) {
  console.error(error.message)

  this.once('finish', () => process.exit(1))
  this.emit('end')
}

// Compile sass task --------------------
// --------------------------------------
gulp.task('scss:compile', () => {
  const compileStylesheet = configPaths.src + 'all.scss'

  return gulp
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
})

// Compile js task ----------------------
// --------------------------------------
gulp.task('js:compile', () => {
  const srcFiles = configPaths.src + 'all.js'

  const SMBCFrontend = gulp
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
    .pipe(eol())

  const GOVUKFrontend = gulp
    .src(configPaths.GOVUKFrontend + 'all.js')
    .pipe(uglify())
    .pipe(eol())

  return merge(SMBCFrontend, GOVUKFrontend)
    .pipe(concat('smbc-frontend.min.js'))
    .pipe(gulp.dest(taskArguments.destination))
})
