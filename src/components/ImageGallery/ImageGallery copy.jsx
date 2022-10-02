import React, { Component } from 'react';
import ImageGalleryItem from './ImageGalleryItem';
import imgAPI from 'api/api';

// function ImageGallery(searchQuery) {
export default class ImageGallery extends Component {
  state = {
    images: [],
    // loading: false,
    error: null,
    status: 'idle',
    totalImgs: 0,
  };
  componentDidUpdate(prevProps, prevState) {
    const request = this.props.searchQuery;
    const page = this.props.page;
    console.log('page', page);

    if (prevProps.searchQuery !== request || prevProps.page !== page) {
      this.setState({
        // loading: true, images: null,
        status: 'pending',
        images: [],
      });
      imgAPI
        .fetchImages(request, page)
        .then(data => {
          if (!data.hits.length) {
            this.setState({
              error: `Nothing to show for "${request}"`,
              status: 'rejected',
            });
          } else {
            this.setState({
              images: [...this.state.images, ...data.hits],
              status: 'resolved',
              totalImgs: data.totalHits,
            });
          }
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
      // .finally(() => this.setState({ loading: false }));
    }
  }
  render() {
    const { images, error, status } = this.state;
    // const { searchQuery } = this.props;

    if (status === 'idle') {
      return <p>Enter your request to find some photos!</p>;
    }

    if (status === 'pending') {
      return <div>Loading...</div>;
    }

    if (status === 'rejected') {
      return <h1>{error.message || error}</h1>;
    }

    if (status === 'resolved') {
      return (
        <ul className="ImageGallery">
          {images.map(({ id, largeImageURL, webformatURL, tags }) => (
            <ImageGalleryItem
              key={id}
              smallImg={webformatURL}
              bigImg={largeImageURL}
              alt={tags}
            />
          ))}
        </ul>
        // <img src={images.hits[0].webformatURL} alt="" />
      );
    }

    // return (
    //   <ul className="gallery">
    //     <li>
    //       <p>{this.props.searchQuery}</p>
    //       {error && <h1>{error.message}</h1>}
    //       {loading && <div>Loading...</div>}
    //       {!searchQuery && <p>Enter your request</p>}
    //       {images && <img src={images.hits[0].webformatURL} alt="" />}
    //     </li>
    //   </ul>
    // );
  }
}

// export default ImageGallery;
