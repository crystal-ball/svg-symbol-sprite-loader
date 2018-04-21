import React from 'react'
import { shape, string } from 'prop-types'

const propTypes = {
  icon: shape({
    id: string.isRequired,
  }).isRequired,
}

const Icon = ({ icon }) => (
  <svg>
    <use xlinkHref={`#${icon.id}`} href={`#${icon.id}`} />
  </svg>
)

Icon.propTypes = propTypes
export default Icon
