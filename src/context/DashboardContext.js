import React, { createContext } from 'react';

export const DashboardContext = createContext();

const initialDashboardState = {
  customers: [],
  isFetching: false,
  hasError: false,
  addCustomerError: false
}

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
      return {
        ...state,
        isFetching: false,
        hasError: false,
        customers: [...state.customers, payload]
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