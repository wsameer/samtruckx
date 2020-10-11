import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import * as appApi from '../utils/api-handlers';
import { DashboardContext } from '../context/DashboardContext';
import AlertMessage from './AlertMessage';
import CustomerForm from './CustomerForm';

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
        <AlertMessage type={'danger'} message={'Failed to add the customer. Please try again.'} />
      )}

      {(!addCustomerError && customerToEdit && !isRequestPending) && (
        <AlertMessage type={'success'} message={`Successfully added a new customer!`} />
      )}

      <CustomerForm
        isButtonDisabled={isButtonDisabled}
        firstName={firstName}
        lastName={lastName}
        email={email}
        buttonText={'Add Customer'}
        title={'Add New Customer'}
        setEmail={setEmail}
        setFirstName={setFirstName}
        setLastName={setLastName}
        handleSubmit={handleSubmit}
      />

    </div>
  )
}

CreateCustomer.propTypes = {

}

export default CreateCustomer

