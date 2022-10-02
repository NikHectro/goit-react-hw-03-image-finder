import React, { Component } from 'react';
import { FaSearch } from 'react-icons/fa';
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
    event.target.reset();
  };

  handleChanges = event => {
    this.setState({ query: event.currentTarget.value.toLowerCase() });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <FaSearch />
            {/* <span className="button-label">Search</span> */}
          </button>

          <input
            className="SearchForm-input"
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
