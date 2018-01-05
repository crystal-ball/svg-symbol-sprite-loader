module.exports = function extractIds(source, opts) {
  const iconSet = new Set()

  const componentInstances = source.match(/<Icon([^/>]*)\/>/g)

  // ⚠️ If the file doesn't have Icon components, bail out
  if (!componentInstances || !componentInstances.length) return source

  componentInstances.forEach(instance => {
    const svgId = instance.match(/id=['|"]([^'"]*)['|"]/)

    if (!svgId.length) this.emitWarning('Component id missing')
    iconSet.add(svgId[1])
  })

  return `${source}
\n/* Imports injected by svg-symbol-sprite-loader */
${[...iconSet]
    .map(icon => `import '${opts.importPath}/${icon}.svg'`)
    .join('\n')}`
}
