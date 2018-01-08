/**
 * @param {string} source Source file contents
 * @param {Object} options Loader options
 */
module.exports = function extractIds(source, { importPath, componentName }) {
  const iconSet = new Set()

  const componentRegexp = new RegExp(`<${componentName}([^/>]*)\\/>`, 'g')
  const componentInstances = source.match(componentRegexp)

  // ⚠️ If the file doesn't have Icon components, bail out
  if (!componentInstances || !componentInstances.length) return source

  componentInstances.forEach(instance => {
    const svgId = instance.match(/id=['|"]([^'"]*)['|"]/)

    if (!svgId.length) this.emitWarning('Component id missing')
    iconSet.add(svgId[1])
  })

  return `${source}

  /* Imports injected by svg-symbol-sprite-loader */
${[...iconSet].map(icon => `import '${importPath}/${icon}.svg'`).join('\n')}`
}
