// overall component for review/rating widget
// as you code, you will need to import each new component and return it withtin render

import React from 'react';
import $ from 'jquery';
import ReviewList from './ReviewList.jsx';
import RatingSection from './RatingSection.jsx';

class ReviewWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productID: props.currentProductId,
      productReviews: [],
      sortBy: 'Relevance',
      displayXReviews: 2,
      filters: []
      //more things to keep track of ?
    };
    this.getProductReviews = this.getProductReviews.bind(this);
    this.getProductReviews();
  }

  getProductReviews() {
    $.ajax({
      type: 'GET',
      url: `/reviews?product_id=${this.state.productID}`,
      success: (data) => {
        this.setState({productReviews: data.results});
      },
      error: (err) => {
        console.log('ERROR Getting Reviews: ', err.message);
      }
    });
  }

  render() {
    return (
      <div>
        <h1>REVIEW AND RATING WIDGET</h1>
        <div id= 'reviewWidgetContainer'>
          <div id= 'ratingSectionContainer'>
            <RatingSection reviews = {this.state.productReviews}/>
          </div>
          <div id= 'reviewListContainer'>
            <ReviewList reviews = {this.state.productReviews} />
            <span>Conditionally render the more reviews button below</span>
            <button>MORE REVIEWS</button>
            <span>   </span>
            <button>ADD REVIEW +</button>
          </div>
        </div>
      </div>
    );
  }
}

// this will be imported by app.jsx
export default ReviewWidget;