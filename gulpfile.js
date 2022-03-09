const { watch, series, parallel } = require('gulp')
const browserSync = require('browser-sync').create()

//Configuration
const path = require('./config/path.js')

//Tasks
const clear = require('./task/clear.js')
const pug = require('./task/pug.js')
const scss = require('./task/scss.js')
const js = require('./task/js.js')

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
  watch(path.scss.watch, scss).on('all', browserSync.reload)
  watch(path.js.watch, js).on('all', browserSync.reload)
}

// Tasks

exports.pug = pug
exports.scss = scss
exports.js = js

//assembly
exports.dev = series(clear, parallel(pug, scss, js), parallel(watcher, server))
