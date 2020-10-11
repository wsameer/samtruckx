import React, { useEffect, useContext, useState } from 'react'
import * as appApi from '../utils/api-handlers';
import { DashboardContext } from '../context/DashboardContext';
import { AuthContext } from '../context/AuthContext';
import Header from './Header';
import CustomerDetails from './CustomerDetails';
import SearchBar from './SearchBar';

function Dashboard(props) {
  const { state: authState } = useContext(AuthContext);
  const { state, dispatch } = useContext(DashboardContext);
  const [searchKeyword, setSearchKeyword] = useState('');
  const { isFetching, totalPages, currentPage, } = state;

  async function getCustomers(currentPage) {
    dispatch({ type: 'FETCH_CUSTOMERS_REQUEST' });
    try {
      const response = await appApi.getCustomers(currentPage);
      if (response.error) {
        throw Error(response.error);
      }
      dispatch({
        type: "FETCH_CUSTOMERS_SUCCESS",
        payload: response
      });
    } catch (error) {
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
  }, [authState.token, currentPage, totalPages]);

  function createNewCustomer() {
    return props.history.push('/create');
  };

  return (
    <div className="container">
      <Header />
      <hr />
      <div className="row mb-2">
        <SearchBar
          setSearchKeyword={setSearchKeyword}
          searchKeyword={searchKeyword}
        />
        <button
          type="button"
          className="btn btn-success"
          onClick={createNewCustomer}>
          Add Customer
        </button>
      </div>

      {isFetching
        ? <div>Loading...</div>
        : <CustomerDetails searchKeyword={searchKeyword} />
      }
    </div>
  )
}

export default Dashboard
