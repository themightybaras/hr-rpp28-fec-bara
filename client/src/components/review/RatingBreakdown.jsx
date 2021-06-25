import React from 'react';
import StarRating from './StarRating.jsx';

const RatingBreakdown = (props) => {
  // make stateful
  // hold percentages for each number

  //function that calculates the percentages for the bars and stores them in state

  return (
    <div>
      <span id='largeAverageRating'>{props.avgRating}</span>
      <StarRating rating = {props.avgRating} />
      {/* pass state for individual numbers here new bar component*/}
    </div>
  );
};

export default RatingBreakdown;