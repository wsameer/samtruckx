import React, { useContext, useEffect, useState } from 'react'
import { DashboardContext } from '../context/DashboardContext';
import CustomerCard from './CustomerCard';
import { AlertMessage } from './shared';

function CustomerDetails({ searchKeyword }) {

  const { state } = useContext(DashboardContext);
  const { customers, isFetching, deleteCustomerError } = state;
  const [filteredCustomers, setFilteredCustomers] = useState([]);

  useEffect(() => {
    let items = customers.filter((customer) => {
      if (searchKeyword == null) {
        return customer;
      } else if (
        customer.first_name.toLowerCase().includes(searchKeyword.toLowerCase())
        || customer.last_name.toLowerCase().includes(searchKeyword.toLowerCase())
        || customer.email.toLowerCase().includes(searchKeyword.toLowerCase())
      ) {
        return customer;
      }
    });
    setFilteredCustomers(items);
  }, [searchKeyword, customers]);

  return (
    <div className="row customer-details-wrapper">

      {deleteCustomerError && (
        <div className="col-sm-12">
          <AlertMessage type={'danger'} message={'Failed to delete customer. Try again.'} />
        </div>
      )}


      {isFetching
        ? <div>Loading...</div>
        : filteredCustomers.length === 0
          ? (
            <div className="col-sm-12 text-center">
              <div className="text-center">No data</div>
            </div>
          )
          : (
            filteredCustomers.map((customer, index) => (
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
          )
      }

    </div>
  );
};

export default CustomerDetails
