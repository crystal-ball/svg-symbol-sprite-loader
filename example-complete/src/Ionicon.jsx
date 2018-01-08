import React from 'react'
import { string } from 'prop-types'

const propTypes = {
  id: string.isRequired,
}

const Ionicon = ({ id }) => (
  <svg className="icon">
    <use href={`#${id}`} />
  </svg>
)

Ionicon.propTypes = propTypes
export default Ionicon
