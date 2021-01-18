export default function uniqueId(prefix) {
  let num = 0
  return function () {
    prefix = String(prefix) || ""
    num += 1
    return prefix + num
  }
}
