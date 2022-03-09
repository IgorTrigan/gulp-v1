const { watch, series, parallel } = require('gulp')
const browserSync = require('browser-sync').create()

//Configuration
const path = require('./config/path.js')

//Tasks
const clear = require('./task/clear.js')
const pug = require('./task/pug.js')
const css = require('./task/css.js')

//server
const server = () => {
  browserSync.init({
    server: {
      baseDir: path.root,
    },
  })
}

//watchers
const watcher = () => {
  watch(path.pug.watch, pug).on('all', browserSync.reload)
  watch(path.css.watch, css).on('all', browserSync.reload)
}

// Tasks

exports.pug = pug
exports.css = css

//assembly
exports.dev = series(clear, parallel(pug, css), parallel(watcher, server))
