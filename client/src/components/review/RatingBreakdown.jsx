import React from 'react';
import StarRating from './StarRating.jsx';

class RatingBreakdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    // holds rating percentages fro each num
    };
    console.log(props)
    // this.getRecommendPercentage = this.getRecommendPercentage.bind(this);
    // this.getBarPercentages = this.getBarPercentages.bind(this);

    // this.getRecommendPercentage(props.reviewMetaData);
  }

  // getRecommendPercentage(metaDataObject) {
  //   var recommendObject = metaDataObject.recommended;

  //   console.log(metaDataObject);
  // }

  // //function that calculates the percentages for the bars and stores them in state
  // getBarPercentages(metaDataObject) {
  //   var ratingsObject = metaDataObject.ratings;

  //   var totalNumReviews = 0;
  //   var currentNumRating = 0;
  //   //itterate over props rating counts
  //   // get total count of ratings
  //   // divide each nbumb over total
  //   var ratingBarPercentage = currentNumRating / totalNumReviews;
  //   // set state for that num

  // }

  render() {
    return (
      <div>
        <span id='largeAverageRating'>{this.props.avgRating}</span>
        <StarRating rating = {this.props.avgRating} />
        {/* pass state for individual numbers here new bar component*/}
      </div>
    );
  }
}

export default RatingBreakdown;