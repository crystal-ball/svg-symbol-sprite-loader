import React from 'react'
import { string } from 'prop-types'

const propTypes = {
  id: string.isRequired,
}

const Icon = ({ id }) => (
  <svg className="icon">
    <use href={`#${id}`} />
  </svg>
)

Icon.propTypes = propTypes
export default Icon
