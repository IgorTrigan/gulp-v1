const { watch, series, parallel } = require('gulp')
const browserSync = require('browser-sync').create()

//Tasks
const clear = require('./task/clear.js')
const pug = require('./task/pug.js')

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
  watch('./src/pug/**/*.pug', pug).on('all', browserSync.reload)
}

// Tasks

exports.pug = pug
exports.watch = watcher
exports.clear = clear

//assembly
exports.dev = series(clear, pug, parallel(watcher, server))
