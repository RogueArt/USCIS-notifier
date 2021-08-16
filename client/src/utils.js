// Check if an ID is valid by matching it to a regular expression
// eslint-disable-next-line
const IDRegex = new RegExp(/^MSC2190\d{6}$/)
export function isValidID(id) {
  return IDRegex.test(id)
}