export default function ImageGalleryItem({
  smallImg,
  alt,
  bigImg,
  onImgClick,
}) {
  return (
    <li className="ImageGalleryItem">
      <img
        src={smallImg}
        alt={alt}
        className="ImageGalleryItem-image"
        onClick={() => onImgClick(bigImg, alt)}
      />
    </li>
  );
}
