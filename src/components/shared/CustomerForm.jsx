import React from 'react'
import PropTypes from 'prop-types'

function CustomerForm(props) {
  const {
    title,
    buttonText,
    setEmail,
    setFirstName,
    setLastName,
    firstName,
    lastName,
    email,
    handleSubmit,
    isButtonDisabled
  } = props;

  return (
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <h2 className="mb-4 pb-2">{title}</h2>
        <form>
          <div className="form-group row">
            <label
              htmlFor="firstName"
              className="col-sm-3 col-form-label">
              First Name
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                value={firstName}
                onChange={e => setFirstName(e.currentTarget.value)}
                placeholder="Enter first name"
              />
            </div>
          </div>

          <div className="form-group row">
            <label
              htmlFor="lastName"
              className="col-sm-3 col-form-label">
              Last Name
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={e => setLastName(e.currentTarget.value)}
                placeholder="Enter last name"
              />
            </div>
          </div>

          <div className="form-group row">
            <label
              htmlFor="email"
              className="col-sm-3 col-form-label">
              Email
            </label>
            <div className="col-sm-9">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={email}
                onChange={e => setEmail(e.currentTarget.value)}
                placeholder="Enter email"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="btn btn-primary mt-2"
            disabled={isButtonDisabled}>
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  )
}

CustomerForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isButtonDisabled: PropTypes.bool.isRequired,
  setEmail: PropTypes.func.isRequired,
  setFirstName: PropTypes.func.isRequired,
  setLastName: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired
}

export default CustomerForm

