import React, { useEffect, useContext } from 'react'
import Navbar from './Navbar';
import * as appApi from '../utils/api-handlers';
import { DashboardContext } from '../context/DashboardContext';
import { AuthContext } from '../context/AuthContext';
import Header from './Header';
import CustomerDetails from './CustomerDetails';

function Dashboard() {
  const { state: authState } = useContext(AuthContext);
  const { state, dispatch } = useContext(DashboardContext);

  const { isFetching, totalPages, currentPage } = state;

  async function getCustomers(currentPage) {
    dispatch({ type: 'FETCH_CUSTOMERS_REQUEST' });
    try {
      const response = await appApi.getCustomers(currentPage);
      if (response.error) {
        throw Error(response.error);
      }
      // console.log(response);
      dispatch({
        type: "FETCH_CUSTOMERS_SUCCESS",
        payload: response
      });
    } catch (error) {
      // console.log(error);
      dispatch({ type: "FETCH_CUSTOMERS_FAILURE" });
    }
  }

  useEffect(() => {
    if (currentPage < totalPages) {
      getCustomers(currentPage + 1);
    }
    return () => {
      //cleanup
    }
  }, [authState.token, currentPage]);

  return (
    <div className="container">
      <Navbar />
      <Header />
      <hr />
      {isFetching
        ? <div>Loading...</div>
        : <CustomerDetails />
      }
    </div>
  )
}

export default Dashboard
