import React from 'react';
import PropTypes from 'prop-types';

function Modal(props) {
  const {
    onModalClose,
    onModalDismiss,
    modalTitle,
    modalBodyContent,
    modalOkayText
  } = props;

  return (
    <div className="modal" style={{ display: 'block' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {modalTitle}
            </h5>
            <button
              type="button"
              className="close"
              onClick={onModalClose}
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>{modalBodyContent}</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onModalClose}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={onModalDismiss}
            >
              {modalOkayText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  onModalClose: PropTypes.func.isRequired,
  onModalDismiss: PropTypes.func.isRequired,
  modalTitle: PropTypes.string.isRequired,
  modalBodyContent: PropTypes.string.isRequired,
  modalOkayText: PropTypes.string.isRequired,
};

export default Modal

