import React from 'react';
import StarRating from './StarRating.jsx';

class RatingBreakdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    // holds rating percentages fro each num
      recommendedPercentage: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0
    };

    this.getRecommendPercentage = this.getRecommendPercentage.bind(this);
    // this.getBarPercentages = this.getBarPercentages.bind(this);
  }

  // componentDidUpdate() {
  //   console.log(this.props);
  //   this.getRecommendPercentage(this.props.reviewMetaData);
  // }

  getRecommendPercentage(metaDataObject) {
    var recommendObject = metaDataObject.recommended;
    if (recommendObject) {
      var totalReviews = parseInt(recommendObject.false) + parseInt(recommendObject.true);
      var recommendPercentage = parseInt(recommendObject.true) / totalReviews;

      this.setState({recommendPercentage: recommendPercentage});
    }
  }

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