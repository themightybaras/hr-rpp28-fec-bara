import React from 'react';
import './styles.scss';
import { FaArrowLeft, FaArrowRight, FaExpand } from 'react-icons/fa';
import PhotoCarousel from './PhotoCarousel.jsx';
import { image } from './Image.jsx';

const CurrentPhoto = ({
  handleViewChange,
  currentPhoto,
  photos,
  handlePhotoChange,
  currentStyle,
}) => {
  const [currentPhotoIndex, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [currentStyle.style_id]);

  return (
    <div className="current-photo-container">
      <div id="current-photo">
        <img alt="photo_of_the_chosen_product" src={currentPhoto} />
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
      {currentPhoto === image ? null : (
        <span id="expand">
          <FaExpand onClick={() => handleViewChange('expanded')} />
        </span>
      )}
    </div>
  );
};

export default CurrentPhoto;
