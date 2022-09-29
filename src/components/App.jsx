import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageGallery from './ImageGallery/ImageGallery';
import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';

export class App extends Component {
  state = {
    searchQuery: '',
    images: null,
    loading: false,
  };

  // componentDidMount() {
  //   this.setState({ loading: true });
  //   fetch(
  //     'https://pixabay.com/api/?q=cat&page=1&key=29344544-28f8077a689a3611398a04467&image_type=photo&orientation=horizontal&per_page=12'
  //   )
  //     .then(res => res.json())
  //     .then(images => this.setState({ images }))
  //     .finally(() => this.setState({ loading: false }));
  // }

  getInputSubmit = query => {
    this.setState({ searchQuery: query });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.getInputSubmit} />
        {this.state.loading && <h1>spiner</h1>}
        {this.state.images && (
          <div>{this.state.images.hits[0].userImageURL}</div>
        )}
        {/* {this.state.images.hits} */}
        <ToastContainer />
        <ImageGallery searchQuery={this.state.searchQuery} />
      </>
    );
  }
}
