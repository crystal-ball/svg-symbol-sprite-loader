import React from 'react'
import { shape, string } from 'prop-types'

import JavaScript from './media/javascript.svg'
import Bootstrap from './media/bootstrap.svg'
import NodeJS from './media/nodejs.svg'

/**
 * Sample of creating a namespaced component for using application icons. This
 * pattern has the disadvantage of making it more difficult to dynamically switch
 * between icons. It's also slightly more verbose.
 */

// Icon component definition
// ---------------------------------------------------------------------------

const propTypes = {
  icon: shape({
    id: string.isRequired,
  }).isRequired,
  className: string,
}

const Icon = ({ icon, className }) => (
  <svg className={className}>
    <use xlinkHref={`#${icon.id}`} href={`#${icon.id}`} />
  </svg>
)
Icon.propTypes = propTypes
Icon.defaultProps = {
  className: null,
}

// Icon component set definition
// ---------------------------------------------------------------------------

const createIcon = (icon) => (props) => Icon.apply(null, [Object.assign({ icon }, props)])

const iconSet = {
  JavaScript,
  Bootstrap,
  NodeJS,
}

/**
 * Set of icons for the application!, see http://google.com
 */
const Icons = {}
Object.keys(iconSet).forEach((icon) => {
  const IconComponent = createIcon(iconSet[icon])
  IconComponent.displayName = `Icons.${icon}`

  Icons[icon] = IconComponent
})

export default Icons
