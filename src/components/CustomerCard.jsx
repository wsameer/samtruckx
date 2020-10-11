import React, { useContext } from 'react'
import { withRouter } from 'react-router-dom';
import { DashboardContext } from '../context/DashboardContext';

function CustomerCard(props) {
  const { dispatch } = useContext(DashboardContext);
  const { id, email, first_name, last_name, avatar, history } = props;

  function editCustomerRequest() {
    dispatch({
      type: 'EDIT_CUSTOMER_REQUEST',
      payload: { id, email, first_name, last_name }
    });

    // why not available
    return props.history.push(`/customer/${id}`);
  }

  return (
    <div className="card customer-card" data-id={id}>
      <button
        type="button"
        className="close"
        aria-label="Close">
        <span aria-hidden="true">×</span>
      </button>
      <div className="media">
        {avatar
          ? <img
            src={avatar}
            alt={last_name}
            className="align-self-center mr-3"
            height="64"
            width="64"
          />
          : <img
            className="align-self-center mr-3"
            src="https://picsum.photos/64"
            alt="placeholder image"
          />
        }

        <div className="media-body">
          <h5 className="mt-0">{first_name} {last_name}</h5>
          <h6 className="card-subtitle text-muted mb-3">{email}</h6>
          <button
            className="btn btn-link card-link p-0"
            onClick={editCustomerRequest}>
            Edit
          </button>
        </div>
      </div>
    </div>
  )
}

CustomerCard.propTypes = {

}

export default withRouter(CustomerCard)

