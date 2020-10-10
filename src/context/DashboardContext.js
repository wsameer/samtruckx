import React, { createContext, useMemo, useReducer } from 'react';

export const DashboardContext = createContext();
DashboardContext.displayName = 'DashboardContext';

function dashboardReducer(state, action) {
  const { payload, type } = action;

  switch (type) {
    case 'FETCH_CUSTOMERS_REQUEST':
      return {
        ...state,
        isFetching: true,
        hasError: false
      };

    case 'FETCH_CUSTOMERS_SUCCESS':
      let data = state.customers.concat(payload.data);
      return {
        ...state,
        isFetching: false,
        hasError: false,
        customers: data,
        currentPage: payload.page,
        perPage: payload.per_page,
        total: payload.total,
        totalPages: payload.total_pages,
      };

    case 'FETCH_CUSTOMERS_FAILURE':
      return {
        ...state,
        isFetching: false,
        hasError: true
      };

    case 'ADD_CUSTOMER_REQUEST':
      return {
        ...state,
      };

    case 'ADD_CUSTOMER_SUCCESS':
      return {
        ...state,
      };

    case 'ADD_CUSTOMER_FAILURE':
      return {
        ...state,
        addCustomerError: true
      };

    case 'EDIT_CUSTOMER_REQUEST':
      return {
        ...state,
      };

    case 'EDIT_CUSTOMER_SUCCESS':
      return {
        ...state,
      };

    case 'EDIT_CUSTOMER_FAILURE':
      return {
        ...state,
      };

    default:
      return state;
  }
}

const initialDashboardState = {
  customers: [],
  isFetching: false,
  hasError: false,
  addCustomerError: false,
  currentPage: 0,
  perPage: 6,
  total: 0,
  totalPages: 1,
}

function DashboardProvider(props) {
  const [state, dispatch] = useReducer(dashboardReducer, initialDashboardState);

  // state has these values
  // const { customers, isFetching, hasError, addCustomerError} = state;

  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <DashboardContext.Provider value={contextValue}>
      {props.children}
    </DashboardContext.Provider>
  );
}

export { DashboardProvider }