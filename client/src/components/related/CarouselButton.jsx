import React from 'react';
import { GrCaretNext, GrCaretPrevious } from 'react-icons/gr';
import ClickTracker from '../../ClickTracker.jsx';

const CarouselButtonLeft = ({firstCard, leftArrowClick}) => {

  return (
    <div className='relatedCarouselLeft' onClick={leftArrowClick}>
      <ClickTracker>
        <div className={firstCard > 0 ? 'carouselButton' : 'display-none'} widget='related products' type='button'>
        ᐊ
        </div>
      </ClickTracker>
    </div>

  );
};

const CarouselButtonRight = ({firstCard, outfitLength, max, rightArrowClick}) => {

  return (
    <div className='relatedCarouselRight' onClick={rightArrowClick}>
      <ClickTracker>
        <div className={firstCard < outfitLength - max ? 'carouselButton' : 'display-none'} widget='related products' type='button'>
        ᐅ
        </div>
      </ClickTracker>
    </div>
  );

};

export { CarouselButtonLeft, CarouselButtonRight };