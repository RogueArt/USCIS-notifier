// Pause an async function for a given number of milliseconds
function wait(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

// Check if an ID is valid by matching it to a regular expression
// eslint-disable-next-line
const IDRegex = new RegExp(/^MSC2190\d{6}$/)
function isValidID(id) {
  return IDRegex.test(id)
}

module.exports = { wait, isValidID }
