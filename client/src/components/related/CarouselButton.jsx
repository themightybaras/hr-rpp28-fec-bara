import React from 'react';
import FaLessThan from 'react-icons/fa';

const CarouselButtonLeft = ({firstCard, leftArrowClick}) => {

  return (
    <div className='relatedCarouselLeft'>
      <div className={firstCard > 0 ? 'other' : 'display-none'}>
        <button type="button" onClick={leftArrowClick} > Left </button>
      </div>
    </div>

  );
};

const CarouselButtonRight = ({firstCard, outfitLength, max, rightArrowClick}) => {

  return (
    <div className='relatedCarouselRight'>
      <div className={firstCard < outfitLength - max ? 'other' : 'display-none'}>
        <button type="button" onClick={rightArrowClick} > Right </button>
      </div>
    </div>
  );

};

export { CarouselButtonLeft, CarouselButtonRight };