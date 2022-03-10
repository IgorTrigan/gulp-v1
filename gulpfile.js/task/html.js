// prosessing HTML
const html = () => {
  return $.gulp
    .src($.path.html.src)
    .pipe(
      $.gp.plumber({
        errorHandler: $.gp.notify.onError((error) => ({
          title: 'HTML',
          message: error.message,
        })),
      })
    )
    .pipe($.gp.fileInclude())
    .pipe($.gp.htmlmin())
    .pipe($.gp.size({ title: 'Before data compression' }))
    .pipe($.gp.htmlmin($.app.htmlmin))
    .pipe($.gp.size({ title: 'After data compression' }))
    .pipe($.gulp.dest($.path.html.dest))
    .pipe($.browserSync.stream())
}

module.exports = html
