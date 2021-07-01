import React from 'react';
import StarRating from './StarRating.jsx';
import RatingBar from './RatingBar.jsx';
import Track from '../../Track.jsx';

class RatingBreakdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    // holds rating percentages fro each num
      recommendPercentage: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0
    };

    this.getRecommendPercentage = this.getRecommendPercentage.bind(this);
    this.getBarPercentages = this.getBarPercentages.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.reviewMetaData.product_id !== prevProps.reviewMetaData.product_id && this.props.reviewMetaData.ratings[1]) {
      this.getRecommendPercentage(this.props.reviewMetaData);
      this.getBarPercentages(this.props.reviewMetaData);
    }

    //console.log(this.state);
  }


  getRecommendPercentage(metaDataObject) {
    var recommendObject = metaDataObject.recommended;
    if (recommendObject) {
      var totalReviews = parseInt(recommendObject.false) + parseInt(recommendObject.true);
      var recommendPercentage = parseInt(recommendObject.true) / totalReviews;
      //console.log(recommendPercentage);
      this.setState({recommendPercentage: recommendPercentage});
    }
  }

  //function that calculates the percentages for the bars and stores them in state
  getBarPercentages(metaDataObject) {
    var ratingsObject = metaDataObject.ratings;

    var totalNumReviews = 0;
    //itterate over props rating counts
    for ( var key in ratingsObject) {
      var addNum = parseInt(ratingsObject[key]);
      totalNumReviews += addNum;
    }
    // get total count of ratings

    for (var key in ratingsObject) {
      var currentNumRating = parseInt(ratingsObject[key]);
      var ratingBarPercentage = currentNumRating / totalNumReviews;
      this.setState( {[key]: ratingBarPercentage});
    }

  }

  render() {
    return (
      <div>
        <span id='largeAverageRating'>{this.props.avgRating}</span>
        <StarRating rating = {this.props.avgRating} />
        <Track>
          <div widget = {'Review Widget'}>
            <span>{Math.round(this.state.recommendPercentage * 100)}% of reviews recomend this product</span>
          </div>
        </Track>
        <br/>
        <RatingBar clickNum = {5} percentFilled = {this.state[5]}/>
        <RatingBar clickNum = {4} percentFilled = {this.state[4]}/>
        <RatingBar clickNum = {3} percentFilled = {this.state[3]}/>
        <RatingBar clickNum = {2} percentFilled = {this.state[2]}/>
        <RatingBar clickNum = {1} percentFilled = {this.state[1]}/>
      </div>
    );
  }
}

export default RatingBreakdown;