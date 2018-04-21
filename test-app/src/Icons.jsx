import React from 'react'
import { shape, string } from 'prop-types'

import JavaScript from './media/javascript.svg'
import Bootstrap from './media/bootstrap.svg'
import NodeJS from './media/nodejs.svg'

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

const createIcon = icon => props =>
  Icon.apply(null, [Object.assign({ icon }, props)])

const Icons = {
  JavaScript: createIcon(JavaScript),
  Bootstrap: createIcon(Bootstrap),
  NodeJS: createIcon(NodeJS),
}

export default Icons
