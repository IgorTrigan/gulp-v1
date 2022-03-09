const { src, dest, watch, series, parallel } = require('gulp')
const browserSync = require('browser-sync').create()
const del = require('del')

//Plugins
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
const fileInclude = require('gulp-file-include')
const htmlmin = require('gulp-htmlmin')
const size = require('gulp-size')
const pugs = require('gulp-pug')

// prosessing HTML
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

// Prosessing PUG

const pug = () => {
  return src('./src/pug/*.pug')
    .pipe(
      plumber({
        errorHandler: notify.onError((error) => ({
          title: 'Pug',
          message: error.message,
        })),
      })
    )
    .pipe(
      pugs({
        pretty: true,
        data: { news: require('./data/news.json') },
      })
    )
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
  watch('./src/pug/**/*.pug', pug)
}

// Tasks

exports.pug = pug
exports.watch = watcher
exports.clear = clear

//assembly
exports.dev = series(clear, pug, parallel(watcher, server))
