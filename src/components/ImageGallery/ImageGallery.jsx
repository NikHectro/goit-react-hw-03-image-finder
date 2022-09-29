import React, { Component } from 'react';

// function ImageGallery(searchQuery) {
export default class ImageGallery extends Component {
  state = {
    images: null,
    loading: false,
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      console.log('search request has changed');

      this.setState({ loading: true });
      fetch(
        `https://pixabay.com/api/?q=${this.props.searchQuery}&page=1&key=29344544-28f8077a689a3611398a04467&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => res.json())
        .then(images => this.setState({ images }))
        .finally(() => this.setState({ loading: false }));
    }
  }
  render() {
    const { images, loading } = this.state;
    const { searchQuery } = this.props;

    return (
      <ul className="gallery">
        <li>
          <p>{this.props.searchQuery}</p>
          {loading && <div>Loading...</div>}
          {!searchQuery && <p>Enter your request</p>}
          {images && <img src={images.hits[0].webformatURL} alt="" />}
        </li>
      </ul>
    );
  }
}

// export default ImageGallery;
