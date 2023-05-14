import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ item }) => {
  const { id, webformatURL, largeImageURL } = item;
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <li key={id} className={css.galleryItem}>
      <img
        onClick={toggleModal}
        className={css.ImageGalleryItemImage}
        src={webformatURL}
        alt="img"
      />
      {showModal && <Modal onClose={toggleModal} image={largeImageURL} />}
    </li>
  );
};

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};
