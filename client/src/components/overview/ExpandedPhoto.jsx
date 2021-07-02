import React from 'react';
import './styles.scss';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { GrFormClose } from 'react-icons/gr';
import PhotoCarousel from './PhotoCarousel.jsx';

const ExpandedPhoto = ({
  handleViewChange,
  photos,
  currentPhoto,
  handlePhotoChange,
}) => {
  const [currentPhotoIndex, setIndex] = useState(0);

  return (
    <div className="expanded-photo-container">
      <div id="current-photo2">
        <img alt="enlarged_photo_of_the_chosen_product" src={currentPhoto} />
      </div>
      <PhotoCarousel
        photos={photos}
        handlePhotoChange={handlePhotoChange}
        currentPhoto={currentPhoto}
        currentPhotoIndex={currentPhotoIndex}
      />
      {currentPhotoIndex > 0 ? (
        <span id="left-arrow">
          <FaArrowLeft
            onClick={() => {
              handlePhotoChange(photos[currentPhotoIndex - 1].url);
              setIndex(currentPhotoIndex - 1);
            }}
          />
        </span>
      ) : null}
      {currentPhotoIndex === photos.length - 1 ? null : (
        <span id="right-arrow">
          <FaArrowRight
            onClick={() => {
              handlePhotoChange(photos[currentPhotoIndex + 1].url);
              setIndex(currentPhotoIndex + 1);
            }}
          />
        </span>
      )}
      <span id="fold">
        <GrFormClose onClick={() => handleViewChange('main')} />
      </span>
    </div>
  );
};

export default ExpandedPhoto;

