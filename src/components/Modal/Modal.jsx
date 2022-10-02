import PropTypes from 'prop-types';
import { Component } from 'react';

export class Modal extends Component {
  static propTypes = {
    bigImg: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDowm);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDowm);
  }

  handleKeyDowm = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  onOverlayClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    const { bigImg, alt } = this.props;
    return (
      <div className="Overlay" onClick={this.onOverlayClick}>
        <div className="Modal">
          <img src={bigImg} alt={alt} />
        </div>
      </div>
    );
  }
}
