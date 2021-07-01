import React from 'react';
import Filler from './Filler.jsx';


const RatingBar = (props) => {

  var clickME = (e) => {
    console.log('CLIIIIIK');
  };

  return (
    <div>
      <span onClick = {clickME}> {props.clickNum} Stars</span>
      <div className='ratingBar'>
        <Filler percentage = {props.percentFilled} />
      </div>
    </div>
  );
};

export default RatingBar;