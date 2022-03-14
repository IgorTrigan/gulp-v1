global.$ = {
  // Packets
  gulp: require('gulp'),
  gp: require('gulp-load-plugins')(),
  browserSync: require('browser-sync').create(),

  //Configuration
  path: require('./config/path.js'),
  app: require('./config/app.js'),
}

//Tasks
const requireDir = require('require-dir')
const task = requireDir('./task', { recurse: true })

//watchers
const watcher = () => {
  $.gulp.watch($.path.pug.watch, task.pug)
  $.gulp.watch($.path.scss.watch, task.scss)
  $.gulp.watch($.path.js.watch, task.js)
  $.gulp.watch($.path.img.watch, task.img)
  $.gulp.watch($.path.font.watch, task.ont)
}

const build = $.gulp.series(
  task.clear,
  $.gulp.parallel(task.pug, task.scss, task.js, task.img, task.font)
)
const dev = $.gulp.series(build, $.gulp.parallel(watcher, task.server))
// Tasks

exports.pug = task.pug
exports.scss = task.scss
exports.js = task.js
exports.img = task.img
exports.font = task.font

//assembly
exports.default = $.app.isProd ? build : dev
