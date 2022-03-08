const { src, dest, watch, series, parallel } = require('gulp')

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
}
//watchers
const watcher = () => {
  watch('./src/html/**/*.html', html)
}

// Tasks

exports.html = html
exports.watch = watcher

//assembly
exports.dev = series(html, watcher)
