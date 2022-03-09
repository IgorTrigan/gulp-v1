const { src, dest, watch, series, parallel } = require('gulp')
const browserSync = require('browser-sync').create()

const fileInclude = require('gulp-file-include')
const htmlmin = require('gulp-htmlmin')
const size = require('gulp-size')

const html = () => {
  return src('./src/html/*.html')
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
//watchers
const watcher = () => {
  watch('./src/html/**/*.html', html)
}

//server
const server = () => {
  browserSync.init({
    server: {
      baseDir: './public',
    },
  })
}

// Tasks

exports.html = html
exports.watch = watcher

//assembly
exports.dev = series(html, parallel(watcher, server))
