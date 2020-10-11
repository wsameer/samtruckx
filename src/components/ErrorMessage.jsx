import React from 'react'
import PropTypes from 'prop-types'

function ErrorMessage({ message, type }) {
  if (!type) {
    type = 'danger';
  }
  return (
    <div className={`alert alert-${type}`} role="alert">
      {message}
    </div>
  )
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

export default ErrorMessage

