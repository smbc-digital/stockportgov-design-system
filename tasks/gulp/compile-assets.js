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

const errorHandler = function (error) {
  // Log the error to the console
  console.error(error.message)

  // Ensure the task we're running exits with an error code
  this.once('finish', () => process.exit(1))
  this.emit('end')
}
// different entry points for both streams below and depending on destination flag
const compileStylesheet = configPaths.src + 'all.scss'
const compileOldIeStylesheet = configPaths.src + 'all-ie8.scss'

gulp.task('scss:compile', () => {
  const compile = gulp.src(compileStylesheet)
    .pipe(plumber(errorHandler))
    .pipe(sass())
    .pipe(postcss([
      autoprefixer,
      cssnano
    ]))
    .pipe(rename({
        basename: 'smbc-frontend',
        extname: '.min.css'
      })
    )
    .pipe(gulp.dest(taskArguments.destination + '/'))

  const compileOldIe = gulp.src(compileOldIeStylesheet)
    .pipe(plumber(errorHandler))
    .pipe(sass())
    .pipe(postcss([
      autoprefixer,
      cssnano,
      require('oldie')({
        rgba: { filter: true },
        rem: { disable: true },
        unmq: { disable: true },
        pseudo: { disable: true }
      })
    ]))
    .pipe(rename({
        basename: 'smbc-frontend-ie8',
        extname: '.min.css'
      })
    )
    .pipe(gulp.dest(taskArguments.destination + '/'))

  return merge(compile, compileOldIe)
})