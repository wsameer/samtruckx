import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import * as appApi from '../utils/api-handlers';
import { DashboardContext } from '../context/DashboardContext';
import AlertMessage from './AlertMessage';
import CustomerForm from './CustomerForm';

function EditCustomer(props) {
  const { state, dispatch } = useContext(DashboardContext);
  const { customerToEdit, isRequestPending, editCustomerError } = state;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const isButtonDisabled = firstName === "" || lastName === "" || email === "";

  useEffect(() => {
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
      dispatch({ type: "EDIT_CUSTOMER_SUCCESS", payload: data });
      clearInputs();
    } catch (error) {
      dispatch({ type: "EDIT_CUSTOMER_FAILURE" });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
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
        <AlertMessage type={'danger'} message={'Failed to update the customer. Please try again.'} />
      )}

      {(!editCustomerError && customerToEdit && !isRequestPending) && (
        <AlertMessage type={'success'} message={`Successfully updated the customer!`} />
      )}

      <CustomerForm
        isButtonDisabled={isButtonDisabled}
        firstName={firstName}
        lastName={lastName}
        email={email}
        buttonText={'Update'}
        title={'Edit Customer'}
        setEmail={setEmail}
        setFirstName={setFirstName}
        setLastName={setLastName}
        handleSubmit={handleSubmit}
      />

    </div>

  )
}

export default EditCustomer
