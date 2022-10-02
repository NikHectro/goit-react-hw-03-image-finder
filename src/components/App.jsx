import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageGallery from './ImageGallery/ImageGallery';
// import axios from 'axios';
import { Button } from './Button/Button';
import imgAPI from 'api/api';
import { Loader } from './Loader/Loader';
// axios.defaults.baseURL = 'https://pixabay.com/api';

export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    images: null,
    loading: false,
    images: [],
    error: null,
    totalImgs: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    const request = this.state.searchQuery;
    const page = this.state.page;
    // console.log('page', page);

    if (prevState.searchQuery !== request || prevState.page !== page) {
      this.fetchImages();
    }
  }

  fetchImages = () => {
    const { searchQuery, page } = this.state;
    this.setState({
      loading: true,
      // images: [],
    });
    imgAPI
      .fetchImages(searchQuery, page)
      .then(console.log('page', page))
      .then(console.log('searchQuery', searchQuery))
      .then(data => {
        if (!data.hits.length) {
          this.setState({
            error: `Nothing to show for "${searchQuery}"`,
            // loading: false,
          });
        } else {
          this.setState({
            images: [...this.state.images, ...data.hits],
            totalImgs: data.totalHits,
          });
        }
      })
      .then(this.scroll)
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  };

  getInputSubmit = query => {
    this.setState({ searchQuery: query, page: 1 });
  };

  handleLoadMoreBtn = () => {
    this.setState(prevStage => ({ page: prevStage.page + 1 }));
    // ({ page }) => ({ page: page + 1 })
  };

  scroll = () => {
    return window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  render() {
    const { loading, images, page, searchQuery, totalImgs } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.getInputSubmit} />
        {loading && <Loader />}
        <ImageGallery searchQuery={searchQuery} page={page} images={images} />
        {images.length !== 0 && images.length < totalImgs && (
          <Button onLoadMoreClick={this.handleLoadMoreBtn} />
        )}
        <ToastContainer />
      </>
    );
  }
}
