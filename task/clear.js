const del = require('del')

//deleting directory
const clear = () => {
  return del('./public')
}

module.exports = clear
