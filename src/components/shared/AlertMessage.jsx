import React from 'react'
import PropTypes from 'prop-types'

function AlertMessage({ message, type }) {
  if (!type) {
    type = 'danger';
  }
  return (
    <div className={`alert alert-${type}`} role="alert">
      {message}
    </div>
  )
}

AlertMessage.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

export default AlertMessage