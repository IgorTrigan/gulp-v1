const del = require('del')

//deleting directory
const clear = () => {
  return del($.path.root)
}

module.exports = clear
