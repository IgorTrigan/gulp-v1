const { src, dest } = require('gulp')

const fileInclude = require('gulp-file-include')
const htmlmin = require('gulp-htmlmin')

const html = () => {
  return src('./src/html/*.html')
    .pipe(fileInclude())
    .pipe(
      htmlmin({
        collapseWhitespace: true,
      })
    )
    .pipe(dest('./public'))
}

exports.html = html
