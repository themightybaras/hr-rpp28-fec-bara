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
      displayXReviews: 2,
      sortBy: 'relevant',
      count: 10000000000000,
      filters: []
      //more things to keep track of ?
    };
    this.getProductReviews = this.getProductReviews.bind(this);
    this.getProductReviews();
    this.changeSorting = this.changeSorting.bind(this);
    this.displayMore = this.displayMore.bind(this);
  }

  getProductReviews() {
    $.ajax({
      type: 'GET',
      url: '/reviews',
      data: {
        // eslint-disable-next-line camelcase
        product_id: this.state.productID,
        sort: this.state.sortBy,
        count: this.state.count
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

  displayMore(e) {
    this.setState({displayXReviews: this.state.displayXReviews += 2});
  }

  render() {
    const moreReviewsCanDisplay = this.state.numberOfReviews >= this.state.displayXReviews;
    return (
      <div>
        <h1>REVIEW AND RATING WIDGET</h1>
        <div id= 'reviewWidgetContainer'>
          <div id= 'ratingSectionContainer'>
            <RatingSection reviews = {this.state.productReviews}/>
          </div>
          <div id= 'reviewContainer'>
            <SortingForm sortValue = {this.state.sortBy} numberOfReviews = {this.state.numberOfReviews} changeSorting = {this.changeSorting} />
            <div id = 'reviewListContainer'>
              <ReviewList reviews = {this.state.productReviews.slice(0, this.state.displayXReviews)} />
            </div>
            <div id = 'reviewButtons'>
              {moreReviewsCanDisplay
                ? <button onClick={this.displayMore} className= 'moreReviewsButton'>MORE REVIEWS</button>
                : <div id='maxOutOnReviews'/>
              }
              <button className = 'addReviewButton'> ADD REVIEW +</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// this will be imported by app.jsx
export default ReviewWidget;