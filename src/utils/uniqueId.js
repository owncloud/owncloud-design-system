export default function uniqueId() {
  let num = 0
  return function (prefix) {
    prefix = String(prefix) || ""
    num += 1
    return prefix + num
  }
}
