import React from 'react';
import { GrCaretNext, GrCaretPrevious } from 'react-icons/gr';

const CarouselButtonLeft = ({firstCard, leftArrowClick}) => {

  return (
    <div className='relatedCarouselLeft' onClick={leftArrowClick}>
      <div className={firstCard > 0 ? 'other' : 'display-none'}>
        {/* <button type="button" onClick={leftArrowClick} > Left </button> */}
        <GrCaretPrevious />
      </div>
    </div>

  );
};

const CarouselButtonRight = ({firstCard, outfitLength, max, rightArrowClick}) => {

  return (
    <div className='relatedCarouselRight' onClick={rightArrowClick}>
      <div className={firstCard < outfitLength - max ? 'other' : 'display-none'}>
        <GrCaretNext />
      </div>
    </div>
  );

};

export { CarouselButtonLeft, CarouselButtonRight };