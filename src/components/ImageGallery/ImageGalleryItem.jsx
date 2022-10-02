export default function ImageGalleryItem({ smallImg, bigImg, alt }) {
  return (
    <li className="ImageGalleryItem">
      <img src={smallImg} alt={alt} className="ImageGalleryItem-image" />
    </li>
  );
}
