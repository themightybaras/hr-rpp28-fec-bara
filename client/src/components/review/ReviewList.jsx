// component for the review list portion
// this will be made up of individual reviews
// the amount it displays will be pased on the state from the Review Widget

import React from 'react';
import IndividualReview from './IndividualReview.jsx';

// review list will take in props from reviewWidget
// review list will need to map over the props and pass them to individual review as props
var ReviewList = (props) => {
  return (
    <ul className = 'reviewList'>
      {props.reviews.map(review =>
        <IndividualReview key = {review.review_id} review = {review}/>
      )}
    </ul>
  );
};

export default ReviewList;