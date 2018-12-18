module.exports = function (property) {
  return function (a,b) {
      let value1 = a[property]
      let value2 = b[property]
      return value2 - value1
  }
}