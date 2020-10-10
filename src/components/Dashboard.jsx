import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';

import * as appApi from '../utils/api-handlers';

function Dashboard() {

  const [customers, setCustomers] = useState([]);

  async function getCustomers() {
    try {
      const response = await appApi.getCustomers();
      if (response.error) {
        throw Error(response.error);
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCustomers();
    return () => {
      //cleanup
    }
  }, [])

  return (
    <>
      <Navbar />
      <div className="container-fluid">

        <div className="row">
          <div className="col-sm">
            <h1>My Customers</h1>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
