import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import * as appApi from '../utils/api-handlers';
import { DashboardContext } from '../context/DashboardContext';
import ErrorMessage from './ErrorMessage';

function EditCustomer(props) {
  const { state, dispatch } = useContext(DashboardContext);
  const { customerToEdit, isRequestPending, editCustomerError } = state;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const isButtonDisabled = firstName === "" || lastName === "" || email === "";

  useEffect(() => {
    console.log(customerToEdit);
    if (customerToEdit) {
      setFirstName(customerToEdit.first_name);
      setLastName(customerToEdit.last_name);
      setEmail(customerToEdit.email);
    }
  }, []);

  function clearInputs() {
    setFirstName('');
    setLastName('');
    setEmail('');
  }

  async function updateCustomer(newCustomer) {
    try {
      dispatch({ type: 'EDIT_CUSTOMER_REQUEST' });
      const response = await appApi.updateCustomer(newCustomer, customerToEdit.id);
      if (response.error) {
        throw Error(response.error);
      }

      const data = {
        first_name: response.name.split(' ')[0],
        last_name: response.name.split(' ').slice(1).join(' '),
        email: response.email,
        id: customerToEdit.id
      };

      console.log(response);
      dispatch({ type: "EDIT_CUSTOMER_SUCCESS", payload: data });
      clearInputs();
    } catch (error) {
      dispatch({ type: "EDIT_CUSTOMER_FAILURE" });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(firstName, lastName, email);
    const newCustomer = {
      name: `${firstName} ${lastName}`,
      email: email
    };
    return updateCustomer(newCustomer);
  }

  if ((!customerToEdit || customerToEdit.length === 0) && !isRequestPending) {
    return (
      <div className="container">
        <div className="col-sm-12 text-center mt-5">
          <p>Customer not found!</p>
          <Link to={'/dashboard'}>
            <button className="btn btn-light">Go back!</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5 pt-5">

      <Link to="/dashboard">
        <button className="btn btn-link">Back</button>
      </Link>

      {editCustomerError && (
        <ErrorMessage type={'danger'} message={'Failed to update the customer. Please try again.'} />
      )}

      {(!editCustomerError && customerToEdit && !isRequestPending) && (
        <ErrorMessage type={'success'} message={`Successfully updated the customer!`} />
      )}

      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2 className="mb-4 pb-2">Edit Customer</h2>
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
              Update
            </button>
          </form>
        </div>
      </div>
    </div>

  )
}

export default EditCustomer
