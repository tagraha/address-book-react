import React from 'react';
import PropTypes from 'prop-types';

const UserModal = (props) => {
  return (
    <div className={`modal ${props.isModalOpen ? 'shown' : 'hidden'}`} onClick={props.closeModal}>
      <div className="modal-center">
        <div className="modal-body animated fadeInUp" onClick={evt => evt.stopPropagation()}>
          <ul>
            <li>{`${props.userData.name.first} ${props.userData.name.last}`}</li>
            <li>{props.userData.location.street}</li>
            <li>{props.userData.location.city}</li>
            <li>{props.userData.location.state}</li>
            <li>{props.userData.location.postcode}</li>
            <li>{props.userData.phone}</li>
            <li>{props.userData.cell}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

UserModal.propTypes = {
  closeModal: PropTypes.func,
  isModalOpen: PropTypes.bool,
  userData: PropTypes.object,
}

export default UserModal;
