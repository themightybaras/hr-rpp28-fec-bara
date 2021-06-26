// overall component for review/rating widget
// as you code, you will need to import each new component and return it withtin render

import React from 'react';
import $ from 'jquery';
import ReviewList from './ReviewList.jsx';
import RatingSection from './RatingSection.jsx';
import SortingForm from './Sorter.jsx';
import ReviewFormModal from './ReviewFormModal.jsx';

class ReviewWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productID: props.currentProductId,
      productName: props.currentProductName,
      productReviews: [],
      numberOfReviews: 0,
      displayXReviews: 2,
      sortBy: 'relevant',
      count: 10000000000000,
      reviewFormModalShown: false
    };
    this.getProductReviews = this.getProductReviews.bind(this);
    this.getProductReviews();
    this.changeSorting = this.changeSorting.bind(this);
    this.displayMore = this.displayMore.bind(this);
    this.showReviewFormModal = this.showReviewFormModal.bind(this);
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

  showReviewFormModal(e) {
    this.setState({reviewFormModalShown: !this.state.reviewFormModalShown});
  }

  render() {
    const moreReviewsCanDisplay = this.state.numberOfReviews >= this.state.displayXReviews;
    return (
      <div>
        <br/>
        <h3>RATINGS & REVIEWS</h3>
        <br/>
        <div id= 'reviewWidgetContainer'>
          <div id= 'ratingSectionContainer'>
            <RatingSection reviews = {this.state.productReviews} overallProductRating = {this.props.overallProductRating} reviewMetaData = {this.props.reviewMetaData}
            />
          </div>
          <div id= 'reviewContainer'>
            <SortingForm sortValue = {this.state.sortBy} numberOfReviews = {this.state.numberOfReviews} changeSorting = {this.changeSorting} />
            <div id = 'reviewListContainer'>
              <ReviewList reviews = {this.state.productReviews.slice(0, this.state.displayXReviews)} />
            </div>
            <div id = 'reviewButtons'>
              {moreReviewsCanDisplay
                ? <button onClick={this.displayMore} className= 'moreReviewsButton'>MORE REVIEWS</button>
                : null
              }
              <button onClick={this.showReviewFormModal} className= 'addReviewButton'> ADD REVIEW +</button>
            </div>
            <ReviewFormModal className = 'modal' onClose={this.showReviewFormModal} show={this.state.reviewFormModalShown} currentProductName = {this.state.productName} />
          </div>
        </div>
      </div>
    );
  }
}

// this will be imported by app.jsx
export default ReviewWidget;