import React from 'react'
import { Link } from 'react-router-dom';

function CustomerCard(props) {
  const { id, email, first_name, last_name, avatar } = props;

  return (
    <div className="card customer-card" data-id={id}>
      <button
        type="button"
        className="close"
        aria-label="Close">
        <span aria-hidden="true">×</span>
      </button>
      <div className="media">
        <img src={avatar} alt={last_name} className="align-self-center mr-3" height="64" width="64"/>
        <div className="media-body">
          <h5 className="mt-0">{first_name} {last_name}</h5>
          <h6 className="card-subtitle text-muted mb-3">{email}</h6>
          <Link to={`/customer?userId=${id}`} className="card-link">Edit</Link>
        </div>
      </div>
    </div>
  )
}

CustomerCard.propTypes = {

}

export default CustomerCard

