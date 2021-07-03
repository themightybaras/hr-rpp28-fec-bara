import React, {useState, useEffect} from 'react';
import './styles.scss';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { image } from './Image.jsx';

const PhotoCarousel = ({ photos, handlePhotoChange, currentPhoto }) => {
  const [photoIndex, setIndex] = useState(0);

  if (currentPhoto === image) {
    return null;
  }

  if (photos.length) {
    return (
      <div className="photo-carousel">
        {photoIndex > 0 ? (
          <span id="arrow-up">
            <IoIosArrowUp onClick={() => setIndex(photoIndex - 1)} />
          </span>
        ) : null}
        <span
          alt="photo_of_the_product"
          id="photo-1"
          style={{
            backgroundImage: photos[photoIndex]
              ? `url(${photos[photoIndex].url})`
              : `url(${image})`,
          }}
          onClick={() => handlePhotoChange(photos[photoIndex].url)}
        />
        <span
          alt="photo_of_the_product"
          id="photo-2"
          style={{
            backgroundImage: photos[photoIndex + 1]
              ? `url(${photos[photoIndex + 1].url})`
              : `url(${image})`,
          }}
          onClick={() => handlePhotoChange(photos[photoIndex + 1].url)}
        />
        <span
          alt="photo_of_the_product"
          id="photo-3"
          style={{
            backgroundImage: photos[photoIndex + 2]
              ? `url(${photos[photoIndex + 2].url})`
              : `url(${image})`,
          }}
          onClick={() => handlePhotoChange(photos[photoIndex + 2].url)}
        />
        <span
          alt="photo_of_the_product"
          id="photo-4"
          style={{
            backgroundImage: photos[photoIndex + 3]
              ? `url(${photos[photoIndex + 3].url})`
              : `url(${image})`,
          }}
          onClick={() => handlePhotoChange(photos[photoIndex + 3].url)}
        />
        <span
          alt="photo_of_the_product"
          id="photo-5"
          style={{
            backgroundImage: photos[photoIndex + 4]
              ? `url(${photos[photoIndex + 4].url})`
              : `url(${image})`,
          }}
          onClick={() => handlePhotoChange(photos[photoIndex + 4].url)}
        />
        {photoIndex < photos.length - 5 ? (
          <span id="arrow-down">
            <IoIosArrowDown onClick={() => setIndex(photoIndex + 1)} />
          </span>
        ) : null}
      </div>
    );
  } else {
    return null;
  }
};

export default PhotoCarousel;
