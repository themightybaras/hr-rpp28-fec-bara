// this will be the fomatter for each individual card

import React from 'react';
import $ from 'jquery';
import StarRating from './StarRating.jsx';
import ReviewImages from './ReviewImages.jsx';


// class component with state
var IndividualReview = (props) => {

  const markHelpful = () => {
    $.ajax({
      type: 'PUT',
      url: `/reviews/${props.review.review_id}/helpful`,
      success: (successMessage) => {
        // rerender review?
        console.log(successMessage);
      },
      error: (err) => {
        console.log('ERROR Marking Review Helpful:', err.message);
      }
    });
  };

  const reportReview = () => {
    $.ajax({
      type: 'PUT',
      url: `/reviews/${props.review.review_id}/report`,
      success: (successMessage) => {
        console.log(successMessage);
        // re-render reviews list
      },
      error: (err) => {
        console.log('ERROR Reporting Review:', err.message);
      }
    });
  };


  return (
    <div className = "individualReview">
      <StarRating rating ={props.review.rating}></StarRating>
      <span>VERIFIED???  </span>
      <span>{props.review.reviewer_name}  </span>
      <span className = 'reviewDate'>{new Date(props.review.date).toLocaleDateString({}, {timeZone: 'UTC', month: 'long', day: 'numeric', year: 'numeric'})}</span><br/>
      <b>{props.review.summary}</b><br/>
      <p>{props.review.body}</p><br/>
      <div>
        {props.review.photos.length
          ? <ReviewImages photos = {props.review.photos}/>
          : <div/>
        }
      </div>
      <div>
        {props.review.recommend
          ? <span className= 'recommended'>✓ I recommend this product</span>
          : <div/>
        }
      </div>
      <div>
        {props.review.response
          ? <p className = 'response'>Response: {props.review.response}</p>
          : <div/>
        }
      </div>
      <br/>
      <span>Helpful? </span><span className = "helpfulRating">({props.review.helpfulness})</span><span className = 'yesButton' onClick = {markHelpful}> Yes</span>
      <span>  |  </span>
      <span onClick = {reportReview}>Report</span>
      <br/>
      <span><b>---------------------------------------------------------</b></span>
    </div>
  );
};

export default IndividualReview;