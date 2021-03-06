// this will be the fomatter for each individual card

import React from 'react';
import $ from 'jquery';
import StarRating from './StarRating.jsx';
import ReviewImages from './ReviewImages.jsx';
import Track from '../../Track.jsx';


// class component with state
var IndividualReview = (props) => {

  const markHelpful = () => {
    $.ajax({
      type: 'PUT',
      url: `/reviews/${props.review.review_id}/helpful`,
      success: (successMessage) => {
        console.log(successMessage);
        alert ('Awesome! Glad you think this review is helpful! We will take note.');
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
        alert ('Thank your for your feedback, we will investigate this post');
      },
      error: (err) => {
        console.log('ERROR Reporting Review:', err.message);
      }
    });
  };


  return (
    <div className = "individualReview">
      <br/>
      <StarRating rating ={props.review.rating}></StarRating>
      <Track>
        <div widget = {'Review Widget'}>
          <span className="reviewerName"> Verified Purchaser ✓   {props.review.reviewer_name}  </span>
        </div>
      </Track>
      <Track>
        <div widget = {'Review Widget'}>
          <span className = 'reviewDate'>{new Date(props.review.date).toLocaleDateString({}, {timeZone: 'UTC', month: 'long', day: 'numeric', year: 'numeric'})}</span>
        </div>
      </Track>
      <br/>
      <Track>
        <div widget = {'Review Widget'}>
          <b>{props.review.summary}</b>
        </div>
      </Track>
      <Track>
        <div widget = {'Review Widget'}>
          <p>{props.review.body}</p>
        </div>
      </Track>
      <div>
        {props.review.photos.length
          ? <div className = "flex-container" >
            <ReviewImages photos = {props.review.photos}/>
          </div>
          : null
        }
      </div>
      <div>
        {props.review.recommend
          ? <Track>
            <div widget = {'Review Widget'}>
              <span className= 'recommended'>✓ I recommend this product</span>
            </div>
          </Track>
          : null
        }
      </div>
      <div>
        {props.review.response
          ?
          <Track>
            <div widget = {'Review Widget'}>
              <p className = 'response'>Response from Seller: {props.review.response}</p>
            </div>
          </Track>
          : null
        }
      </div>
      <br/>
      <span>Helpful? </span><span className = "helpfulRating">({props.review.helpfulness})</span><span className = 'yesButton' onClick = {markHelpful}> Yes</span>
      <span>  |  </span>
      <span onClick = {reportReview}>Report</span>
      <br/>
      <br/>
      <hr/>
    </div>
  );
};

export default IndividualReview;


// VERIFIED USER IS CURRENTLY HARDCODED