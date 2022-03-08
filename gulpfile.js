const { src, dest } = require('gulp')

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

exports.html = html
