import React from 'react';
import StarRating from './StarRating.jsx';

const RatingBreakdown = (props) => {
  return (
    <div>
      <h4>Rating Breakdown Here</h4>
      <h2>{props.avgRating}</h2>
      <StarRating rating = {props.avgRating} />

    </div>
  );
};

export default RatingBreakdown;