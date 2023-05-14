import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import css from './Searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
  const [hits, setHits] = useState('');

  const onInputChange = e => {
    e.preventDefault();
    setHits(e.currentTarget.value.toLowerCase());
  };

  const handleInputSubmit = e => {
    e.preventDefault();
    if (hits.trim() === '') {
      toast.error('Введите имя картинки!');
      return;
    }

    onSubmit(hits);
    setHits('');
  };

  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={handleInputSubmit}>
        <button type="submit" className={css.searchForm__button}>
          <ImSearch style={{ marginLeft: 8, marginTop: 7 }} />
          <span className={css.searchForm__button__label}></span>
        </button>

        <input
          name="input"
          className={css.searchForm__input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={hits}
          onInput={onInputChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
