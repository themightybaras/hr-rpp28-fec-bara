import React from 'react';
import ReactDOM from 'react-dom';
import Overview from 'overview-module';
import RelatedOutfit from './components/related/RelatedOutfit.jsx';
import QuestionList from './components/questions/QuestionList.jsx';
import ReviewWidget from './components/review/ReviewWidget.jsx';
import StarRating from './components/review/StarRating.jsx';
import Track from './Track.jsx';
import $ from 'jquery';
import apiIP from '../../apiIP.js';



class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      currentProductId: 22161,
      currentProductName: 'Adell 300 Shoes',
      overallProductRating: 0,
      reviewMetaData: {},
      currentProductInfo: {}
    };

    this.getCurrentProductInfo = this.getCurrentProductInfo.bind(this);
    this.changeCurrentProduct = this.changeCurrentProduct.bind(this);
    this.getReviewMetaData = this.getReviewMetaData.bind(this);
    // this.averageRatings = this.averageRatings.bind(this);

    this.getCurrentProductInfo();
    this.getReviewMetaData();

  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentProductId !== prevState.currentProductId) {
      this.getCurrentProductInfo();
      this.getReviewMetaData();
    }
  }

  componentDidMount() {
    this.getReviewMetaData();
  }

  getCurrentProductInfo() {
    $.get('/app', { 'id': this.state.currentProductId }, (currentProductInfo) => {
      this.setState({ currentProductInfo: currentProductInfo });
    });
  }

  getReviewMetaData() {
    $.ajax({
      type: 'GET',
      url: '/reviews/meta?product_id=' + this.state.currentProductId,
      success: (data) => {
        var averageRatings = (ratingsCountsObject) => {
          var totalNumberReviews = 0;
          var sumOfRatings = 0;

          for (var key in ratingsCountsObject) {
            var currentRatingNumber = parseInt(key);
            var numberOfCurrentRating = parseInt(ratingsCountsObject[key]);
            var totalForRating = currentRatingNumber * numberOfCurrentRating;

            totalNumberReviews += numberOfCurrentRating;
            sumOfRatings += totalForRating;
          }

          return (sumOfRatings / totalNumberReviews);
        };

        var computedRating = parseInt(averageRatings(data.ratings).toFixed(2));
        this.setState({overallProductRating: computedRating});
        this.setState({reviewMetaData: data});
      },
      error: (err) => {
        console.log('ERROR Getting Overall Rating: ', err.message);
      }
    });
  }

  //

  // Click handler for product cards. Should reset current product to clicked product and trigger rerender (and get product info for new current product)
  changeCurrentProduct(id) {
    this.setState({ currentProductId: id });
    console.log('App product ID: ', this.state.currentProductId);
  }


  render() {
    return (
      <div>
        <h1>MightyBaras Retail</h1>
        <Track>
          <button>CLICK</button>
          <span>Also click</span>
        </Track>

        <div>
          <Track>
            <Overview apiIP={apiIP} productId={this.state.currentProductId} stars={<StarRating rating={this.state.overallProductRating} />} />
          </Track>
          <RelatedOutfit currentProductId = {this.state.currentProductId} currentProductInfo = {this.state.currentProductInfo} changeCurrentProduct={this.changeCurrentProduct}/>
          <QuestionList currentProductId = {this.state.currentProductId} currentProductName={this.state.currentProductName} />
          <ReviewWidget currentProductId = {this.state.currentProductId} currentProductName = {this.state.currentProductName} overallProductRating = {this.state.overallProductRating} reviewMetaData= {this.state.reviewMetaData}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));


