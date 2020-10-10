import React, { useContext } from 'react'
import CustomerCard from './CustomerCard';
import { DashboardContext } from '../context/DashboardContext';

function CustomerDetails() {

  const { state } = useContext(DashboardContext);
  const { customers, isFetching } = state;

  return (
    <div className="row">
      {isFetching
        ? (<div>Loading...</div>)
        : customers.map((customer, index) => (
          <div className="col-sm-4" key={index}>
            <CustomerCard
              id={customer.id}
              email={customer.email}
              first_name={customer.first_name}
              last_name={customer.last_name}
              avatar={customer.avatar}
            />
          </div>
        ))
      }
    </div>
  )
}


export default CustomerDetails

