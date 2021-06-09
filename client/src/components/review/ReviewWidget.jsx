// overall component for review/rating widget
// as you code, you will need to import each new component and return it withtin render

import React from 'react';
import $ from 'jquery';
import ReviewList from './ReviewList.jsx';
import RatingSection from './RatingSection.jsx';
import SortingForm from './Sorter.jsx';

class ReviewWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productID: props.currentProductId,
      productReviews: [],
      numberOfReviews: 0,
      sortBy: 'relevant',
      displayXReviews: 2,
      filters: []
      //more things to keep track of ?
    };
    this.getProductReviews = this.getProductReviews.bind(this);
    this.getProductReviews();
    this.changeSorting = this.changeSorting.bind(this);
  }

  getProductReviews() {
    $.ajax({
      type: 'GET',
      url: '/reviews',
      data: {
        // eslint-disable-next-line camelcase
        product_id: this.state.productID,
        sort: this.state.sortBy
      },
      success: (data) => {
        this.setState({productReviews: data.results});
        this.setState({numberOfReviews: data.results.length});
      },
      error: (err) => {
        console.log('ERROR Getting Reviews: ', err.message);
      }
    });
  }

  changeSorting(e) {
    this.setState({sortBy: e.target.value}, ()=>{ this.getProductReviews(); });
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
            <SortingForm sortValue = {this.state.sortBy} numberOfReviews = {this.state.numberOfReviews} changeSorting = {this.changeSorting} />
            <ReviewList reviews = {this.state.productReviews} />
            <span>Conditionally render the more reviews button below</span><br/>
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