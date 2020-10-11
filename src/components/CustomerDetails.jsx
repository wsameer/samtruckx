import React, { useContext, useEffect, useState } from 'react'
import CustomerCard from './CustomerCard';
import { DashboardContext } from '../context/DashboardContext';

function CustomerDetails({ searchKeyword }) {

  const { state } = useContext(DashboardContext);
  const { customers, isFetching } = state;
  const [filteredCustomers, setFilteredCustomers] = useState([]);

  useEffect(() => {

    let items = customers.filter((customer) => {
      // for null, false, '', undefined checks
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

  }, [searchKeyword])

  return (
    <div className="row">
      {isFetching
        ? (<div>Loading...</div>)
        : filteredCustomers.map((customer, index) => (
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
  );
};

export default CustomerDetails
