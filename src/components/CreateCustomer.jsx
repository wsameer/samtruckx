import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import * as appApi from '../utils/api-handlers';
import { DashboardContext } from '../context/DashboardContext';
import ErrorMessage from './ErrorMessage';

function CreateCustomer(props) {

  const { state, dispatch } = React.useContext(DashboardContext);
  const { customerToEdit, isRequestPending, addCustomerError } = state;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const isButtonDisabled = firstName === "" || lastName === "" || email === "" || isRequestPending;

  function clearInputs() {
    setFirstName('');
    setLastName('');
    setEmail('');
  }

  async function createCustomer(newCustomer) {
    try {
      dispatch({ type: 'ADD_CUSTOMER_REQUEST' });
      const response = await appApi.createCustomer(newCustomer);
      if (response.error) {
        throw Error(response.error);
      }
      const data = {
        first_name: response.name.split(' ')[0],
        last_name: response.name.split(' ').slice(1).join(' '),
        email: response.email,
        id: parseInt(response.id, 10),
        createdAt: response.createdAt
      };
      dispatch({ type: "ADD_CUSTOMER_SUCCESS", payload: data });
      clearInputs();
    } catch (error) {
      dispatch({ type: "ADD_CUSTOMER_FAILURE" });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(firstName, lastName, email);
    const newCustomer = {
      name: `${firstName} ${lastName}`,
      email: email
    };
    return createCustomer(newCustomer);
  }

  return (
    <div className="container mt-5 pt-5">

      <Link to="/dashboard">
        <button className="btn btn-link">Back</button>
      </Link>

      {addCustomerError && (
        <ErrorMessage type={'danger'} message={'Failed to add the customer. Please try again.'} />
      )}

      {(!addCustomerError && customerToEdit && !isRequestPending) && (
        <ErrorMessage type={'success'} message={`Successfully created a customer named ${customerToEdit.name}`} />
      )}

      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2 className="mb-4 pb-2">Add Customer</h2>
          <form>
            <div className="form-group row">
              <label htmlFor="firstName" className="col-sm-3 col-form-label">First Name</label>
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
              <label htmlFor="lastName" className="col-sm-3 col-form-label">Last Name</label>
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
              <label htmlFor="email" className="col-sm-3 col-form-label">Email</label>
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
              Add New Customer
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

CreateCustomer.propTypes = {

}

export default CreateCustomer

