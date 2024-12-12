module.exports = function (source) {
  if (this.resourcePath.endsWith('-cc.svg')) return source
  return source.replace(/\s+(fill=)['"]#\w+['"]\s+/g, ` $1"currentColor" `)
}