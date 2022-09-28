import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';

export class App extends Component {
  state = { searchQuery: '' };

  getInputSubmit = query => {
    this.setState({ searchQuery: query });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.getInputSubmit} />
      </>
    );
  }
}
