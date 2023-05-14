import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';
const modalElement = document.querySelector('#modal__root');

export const Modal = ({ onClose, image }) => {
  const handleBackdropClic = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div className={css.overlay} onClick={handleBackdropClic}>
      <div className={css.modal}>
        <img src={image} alt="img" />
      </div>
    </div>,
    modalElement
  );
};
