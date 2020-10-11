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
        isRequestPending: true,
        callToAction: 'create',
        addCustomerError: false
      };
    case 'ADD_CUSTOMER_SUCCESS':
      console.log(payload);
      const combinedCustomers = state.customers.concat(payload);
      return {
        ...state,
        isRequestPending: false,
        customerToEdit: payload,
        addCustomerError: false,
        customers: combinedCustomers // hack since the given API is not saving the new customer
      };
    case 'ADD_CUSTOMER_FAILURE':
      return {
        ...state,
        addCustomerError: true,
        isRequestPending: false,
        customerToEdit: null
      };

    case 'EDIT_CUSTOMER_REQUEST':
      return {
        ...state,
        editCustomerError: false,
        customerToEdit: payload,
        isRequestPending: true
      };
    case 'EDIT_CUSTOMER_SUCCESS':
      console.log(payload);
      let newData = state.customers.map((c, i) => {
        console.log(c);
        if (c.id === payload.id) {
          c.first_name = payload.first_name;
          c.last_name = payload.last_name;
          c.email = payload.email;
        }
        return c;
      })
      return {
        ...state,
        editCustomerError: false,
        isRequestPending: false,
        customerToEdit: payload,
        customers: newData
      };
    case 'EDIT_CUSTOMER_FAILURE':
      return {
        ...state,
        editCustomerError: true,
        isRequestPending: false
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
  editCustomerError: false,
  currentPage: 0,
  perPage: 6,
  total: 0,
  totalPages: 1,
  callToAction: null, // create or edit (this is a backup) Experimental
  customerToEdit: null, // contains - email, createdAt, id, first_name, last_name or name
  isRequestPending: false
}

function DashboardProvider(props) {
  const [state, dispatch] = useReducer(dashboardReducer, initialDashboardState);
  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  return (
    <DashboardContext.Provider value={contextValue}>
      {props.children}
    </DashboardContext.Provider>
  );
}

export { DashboardProvider }