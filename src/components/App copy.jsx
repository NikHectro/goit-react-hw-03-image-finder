import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageGallery from './ImageGallery/ImageGallery';
// import axios from 'axios';
import { Button } from './Button/Button';

// axios.defaults.baseURL = 'https://pixabay.com/api';

export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    // images: null,
    // loading: false,
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
    this.setState({ searchQuery: query, page: 1 });
  };

  handleLoadMoreBtn = () => {
    this.setState(prevStage => ({ page: prevStage.page + 1 }));
    // ({ page }) => ({ page: page + 1 })
  };

  render() {
    const loading = this.state.loading;
    return (
      <>
        <Searchbar onSubmit={this.getInputSubmit} />
        {loading && <h1>spiner</h1>}
        {/* {this.state.images && (
          <div>{this.state.images.hits[0].userImageURL}</div>
        )} */}
        {/* {this.state.images.hits} */}

        <ImageGallery
          searchQuery={this.state.searchQuery}
          page={this.state.page}
        />
        {/* {this.props.images.length !== 0 && !loading && ( */}
        <Button onLoadMoreClick={this.handleLoadMoreBtn} />
        {/* )} */}
        <ToastContainer />
      </>
    );
  }
}
