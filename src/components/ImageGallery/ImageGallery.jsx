import React from 'react';
import ImageGalleryItem from './ImageGalleryItem';

function ImageGallery({ images }) {
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

export default ImageGallery;
