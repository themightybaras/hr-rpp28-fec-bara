import React from 'react';
import RatingBreakdown from './RatingBreakdown.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';

class RatingSection extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      reviews: props.reviews,
      averageRating: 2.5
    };
  }
  render() {
    return (
      <div>
        <div id="ratingBreakdown">
          <RatingBreakdown avgRating = {this.state.averageRating}/>
        </div>
        <div id="productBreakdown">
          <ProductBreakdown />
        </div>
      </div>
    );
  }
}

export default RatingSection;
