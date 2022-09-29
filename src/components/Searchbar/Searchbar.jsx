import React, { Component } from 'react';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';

export default class Searchbar extends Component {
  state = { query: '' };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.query.trim() === '') {
      // alert('Please, enter category');
      return toast.warn('Please, enter category');
    }

    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  handleChanges = event => {
    this.setState({ query: event.currentTarget.value.toLowerCase() });
  };

  render() {
    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.handleSubmit}>
          <button type="submit" className="button">
            <ImSearch style={{ marginRight: 8 }} />
            Search
            {/* <span className="button-label">Search</span> */}
          </button>

          <input
            className="input"
            value={this.state.query}
            onChange={this.handleChanges}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
