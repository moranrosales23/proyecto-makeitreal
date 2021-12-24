import React from 'react';
import PropTypes from 'prop-types';
import './Modal.css';

const Modal = function Modal({ children, title, close }) {
  return (
    <div className='container__modal'>
      <div className='modal'>
        <div className='modal__header'>
          <h3 className='modal__header--title'>{title}</h3>
          <img
            src='img/211652_close_icon.svg'
            alt='close'
            className='modal__header--icon'
            onClick={() => close(false)}
            aria-hidden='true'
          />
        </div>
        <hr />
        <div className='modal__body'>{children}</div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
};

export default Modal;
