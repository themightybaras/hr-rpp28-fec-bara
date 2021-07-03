import React from 'react';
import Filler from './Filler.jsx';


const RatingBar = (props) => {
  return (
    <div>
      <span onClick = {() => { props.filterReviews(props.clickNum); } } value= {props.clickNum}> {props.clickNum} Stars</span>
      <div className='ratingBar'>
        <Filler percentage = {props.percentFilled} />
      </div>
    </div>
  );
};

export default RatingBar;