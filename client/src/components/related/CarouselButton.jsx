import React from 'react';
import FaLessThan from 'react-icons/fa';

const CarouselButtonLeft = ({firstCard, leftArrowClick}) => {

  return (
    <div className='relatedCarouselLeft'>
      <div className={firstCard > 0 ? 'other' : 'display-none'}>
        {firstCard > 0 ? <button type="button" onClick={leftArrowClick} style={{backgroundColor: 'white', border: 'none'}}> Left </button> : ''}
      </div>
    </div>

  );
};

const CarouselButtonRight = ({firstCard, outfitLength, rightArrowClick}) => {

  return (
    <div className='relatedCarouselRight'>
      {firstCard < outfitLength - 3 ? <button type="button" onClick={rightArrowClick} style={{backgroundColor: 'white', border: 'none'}}> Right </button> : ''}
    </div>
  );

};

export { CarouselButtonLeft, CarouselButtonRight };