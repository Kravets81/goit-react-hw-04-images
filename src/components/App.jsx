import React, { useState } from 'react';
import { Loader } from './Loader/Loader';
import { Searchbar } from './Searchbar/Searchbar';
import { ToastContainer, toast } from 'react-toastify';
import ImageGallery from './ImageGallery/ImageGallery';
import { fatchImages } from './Fetch';
import { Button } from './Button/Button';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const [hits, setHits] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleFormSubmit = async searchQuery => {
    setLoading(true);
    setSearchQuery(searchQuery);

    try {
      const response = await fatchImages(searchQuery);
      if (response.length === 0) {
        toast.error('No results found!');
      } else {
        setHits(response);
        setPage(1);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMoreButtonClick = async () => {
    setLoading(true);
    setPage(page + 1);

    try {
      const response = await fatchImages(searchQuery, page + 1);
      setHits([...hits, ...response]);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <p>Упс, что-то пошло не так: {error.message}</p>}
      <Searchbar onSubmit={handleFormSubmit} />

      {loading && <Loader />}

      <ImageGallery imageHits={hits} />
      {hits.length > 11 && <Button onClick={handleLoadMoreButtonClick} />}

      <ToastContainer autoClose={2500} theme="colored" />
    </div>
  );
};
