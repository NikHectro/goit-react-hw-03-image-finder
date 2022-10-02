import React from 'react';
import ImageGalleryItem from './ImageGalleryItem';

function ImageGallery({ images, onImgClick }) {
  return (
    <ul className="ImageGallery">
      {images.map(({ id, largeImageURL, webformatURL, tags }) => (
        <ImageGalleryItem
          key={id}
          smallImg={webformatURL}
          bigImg={largeImageURL}
          alt={tags}
          onImgClick={onImgClick}
        />
      ))}
    </ul>
  );
}

export default ImageGallery;
