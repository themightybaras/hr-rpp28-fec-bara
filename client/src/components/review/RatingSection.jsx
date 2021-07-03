import React from 'react';
import RatingBreakdown from './RatingBreakdown.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';

class RatingSection extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      reviews: props.reviews
    };
  }


  render() {
    return (
      <div>
        <div id="ratingBreakdown">
          <RatingBreakdown avgRating = {this.props.overallProductRating} reviewMetaData={this.props.reviewMetaData} filterReviews = {this.props.filterReviews} removeFilters = {this.props.removeFilters} filtered = {this.props.filtered}/>
        </div>
        <div id="productBreakdown">
          <ProductBreakdown avgRating = {this.props.overallProductRating} reviewMetaData= {this.props.reviewMetaData} />
        </div>
      </div>
    );
  }
}

export default RatingSection;
