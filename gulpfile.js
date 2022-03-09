const { src, dest, watch, series, parallel } = require('gulp')
const browserSync = require('browser-sync').create()
const del = require('del')

//Plugins
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
const fileInclude = require('gulp-file-include')
const htmlmin = require('gulp-htmlmin')
const size = require('gulp-size')

const html = () => {
  return src('./src/html/*.html')
    .pipe(
      plumber({
        errorHandler: notify.onError((error) => ({
          title: 'HTML',
          message: error.message,
        })),
      })
    )
    .pipe(fileInclude())
    .pipe(size({ title: 'Before data compression' }))
    .pipe(
      htmlmin({
        collapseWhitespace: true,
      })
    )
    .pipe(size({ title: 'After data compression' }))
    .pipe(dest('./public'))
    .pipe(browserSync.stream())
}

//deleting directory
const clear = () => {
  return del('./public')
}

//server
const server = () => {
  browserSync.init({
    server: {
      baseDir: './public',
    },
  })
}

//watchers
const watcher = () => {
  watch('./src/html/**/*.html', html)
}

// Tasks

exports.html = html
exports.watch = watcher
exports.clear = clear

//assembly
exports.dev = series(clear, html, parallel(watcher, server))
