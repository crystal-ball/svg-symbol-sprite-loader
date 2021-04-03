import React from 'react'
import { string } from 'prop-types'

// Ionicons imports
import checkmark from 'ionicons/dist/svg/checkmark-circle.svg'
import bonfire from 'ionicons/dist/svg/bonfire.svg'
import speedometer from 'ionicons/dist/svg/speedometer.svg'

// /media imports
import javascript from './media/javascript.svg'
import bootstrap from './media/bootstrap.svg'
import nodejs from './media/nodejs.svg'

/**
 * Example Icon component which is also responsible for importing all of the icons
 * used in an application. Using a single file to declare all icons used has the
 * advantages of:
 *
 * 1. Enabling a quick overview of all the icons being used in an app.
 * 2. Providing a simple, familiar process for including icons.
 * 3. Can declare flow types for intellisense of available icon ids
 * 4. Is concise and uses only a single component declaration.
 *
 * Some of the disadvantages are:
 *
 * 1. Apps with LOTS of icons may find this doesn't scale well.
 * 2. When using an imported library component it would be more difficult to warn
 *    when an id that hasn't been imported is used.
 */

// Map of imported icons simplifies warning when a component that hasn't been
// imported is used in an app.
const iconSet = {
  'md-bonfire': bonfire,
  'md-speedometer': speedometer,
  'md-checkmark': checkmark,
  javascript,
  bootstrap,
  nodejs,
}

/**
 * Application icons component, note that VSCode includes links in docs, so you
 * could link to a page!
 */
const Icon = ({ id, className }) => {
  if (!iconSet[id]) console.warn('Invalid Icon: ', id)
  const { id: symbolId } = iconSet[id]

  return (
    <svg className={className}>
      <use xlinkHref={`#${symbolId}`} href={`#${symbolId}`} />
    </svg>
  )
}
Icon.propTypes = {
  className: string,
  id: string.isRequired,
}

Icon.defaultProps = {
  className: null,
}

export default Icon
