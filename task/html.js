const { src, dest } = require('gulp')

//Configuration
const path = require('../config/path.js')
const app = require('../config/app.js')

//Plugins
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
const fileInclude = require('gulp-file-include')
const htmlmin = require('gulp-htmlmin')
const size = require('gulp-size')
const webpHtml = require('gulp-webp-html')

// prosessing HTML
const html = () => {
  return src(path.html.src)
    .pipe(
      plumber({
        errorHandler: notify.onError((error) => ({
          title: 'HTML',
          message: error.message,
        })),
      })
    )
    .pipe(fileInclude())
    .pipe(htmlmin())
    .pipe(size({ title: 'Before data compression' }))
    .pipe(htmlmin(app.htmlmin))
    .pipe(size({ title: 'After data compression' }))
    .pipe(dest(path.html.dest))
}

module.exports = html
