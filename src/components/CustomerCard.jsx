import React, { useContext, useState } from 'react'
import { withRouter } from 'react-router-dom';
import { DashboardContext } from '../context/DashboardContext';
import * as appApi from '../utils/api-handlers';
import Modal from './Modal';

function CustomerCard(props) {
  const { dispatch } = useContext(DashboardContext);
  const { id, email, first_name, last_name, avatar } = props;
  const [showModal, setShowModal] = useState(false);

  /**
   * Sends to Edit Customer page
   */
  function onEditCustomerRequest() {
    dispatch({
      type: 'EDIT_CUSTOMER_REQUEST',
      payload: { id, email, first_name, last_name }
    });
    return props.history.push(`/customer/${id}`);
  }

  /**
   * Shows the generic modal
   */
  function onShowModal() {
    setShowModal(true);
  }

  /**
   * Closes the generic modal
   */
  function onHideModal() {
    setShowModal(false);
  }

  /**
   * Makes a DELETE customer API request
   * @param {number} customerId The id of the customer
   */
  async function deleteCustomer(customerId) {
    try {
      dispatch({ type: 'DELETE_CUSTOMER_REQUEST' });
      const response = await appApi.deleteCustomer(customerId);
      if (response.error) {
        throw Error(response.error);
      }
      dispatch({
        type: "DELETE_CUSTOMER_SUCCESS",
        payload: response
      });
    } catch (error) {
      dispatch({ type: "DELETE_CUSTOMER_FAILURE" });
    }
    onHideModal();
  }

  /**
   * Handles the on delete customer confirmation 
   */
  function onDeleteCustomer() {
    const customerId = parseInt(id, 10);
    return deleteCustomer(customerId);
  }

  return (
    <div className="card customer-card" data-id={id}>
      <button
        type="button"
        className="close"
        aria-label="Close"
        onClick={onShowModal}>
        <span aria-hidden="true">×</span>
      </button>

      {showModal && (
        <Modal
          modalOkayText={'Delete'}
          modalTitle={'Delete Customer'}
          modalBodyContent={'Are you sure you want to delete this customer?'}
          onModalClose={onHideModal}
          onModalDismiss={onDeleteCustomer}
        />
      )}

      <div className="media">
        {avatar
          ? <img src={avatar} alt={last_name} className="align-self-center mr-3" height="64" width="64" />
          : <img className="align-self-center mr-3" src="https://picsum.photos/64" alt="placeholder" />
        }

        <div className="media-body">
          <h5 className="mt-0">{first_name} {last_name}</h5>
          <h6 className="card-subtitle text-muted mb-3">{email}</h6>
          <button
            className="btn btn-link card-link p-0"
            onClick={onEditCustomerRequest}>
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(CustomerCard)

