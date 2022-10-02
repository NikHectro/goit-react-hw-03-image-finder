import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageGallery from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import imgAPI from 'api/api';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

// import axios from 'axios';
// axios.defaults.baseURL = 'https://pixabay.com/api';

export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    images: [],
    loading: false,
    error: null,
    totalImgs: 0,
    showModal: false,
    largeImageURL: '',
    alt: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const request = this.state.searchQuery;
    const page = this.state.page;

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
    this.setState({ searchQuery: query, page: 1, images: [], error: '' });
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

  toggleModal = () => {
    this.setState(state => ({ showModal: !state.showModal }));
  };

  openModal = largeImageURL => {
    this.setState({ showModal: true, largeImageURL: largeImageURL });
  };

  onImgClick = ({ largeImageURL, alt }) => {
    this.setState({ showModal: true, largeImageURL: largeImageURL, alt: alt });
  };

  render() {
    const { loading, images, error, totalImgs, alt, largeImageURL, showModal } =
      this.state;
    return (
      <>
        <Searchbar onSubmit={this.getInputSubmit} />
        {loading && <Loader />}
        {!loading && error && <h1>{error}</h1>}
        <ImageGallery images={images} onImgClick={this.openModal} />
        {images.length !== 0 && images.length < totalImgs && (
          <Button onLoadMoreClick={this.handleLoadMoreBtn} />
        )}
        {showModal && (
          <Modal onClose={this.toggleModal} bigImg={largeImageURL} alt={alt} />
        )}
        <ToastContainer />
      </>
    );
  }
}
