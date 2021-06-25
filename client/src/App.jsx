import React from 'react';
import ReactDOM from 'react-dom';
import Overview from 'overview-module';
import RelatedOutfit from './components/related/RelatedOutfit.jsx';
import QuestionList from './components/questions/QuestionList.jsx';
import ReviewWidget from './components/review/ReviewWidget.jsx';
import StarRating from './components/review/StarRating.jsx';
import $ from 'jquery';


class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      currentProductId: 22161,
      currentProductName: 'Adell 300 Shoes',
      overallProductRating: 0,
      currentProductInfo: {}
    };

    this.getCurrentProductInfo = this.getCurrentProductInfo.bind(this);
    this.changeCurrentProduct = this.changeCurrentProduct.bind(this);
    this.getOverallProductRating = this.getOverallProductRating.bind(this);
    // this.averageRatings = this.averageRatings.bind(this);

    this.getCurrentProductInfo();
    this.getOverallProductRating();

  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentProductId !== prevState.currentProductId) {
      this.getCurrentProductInfo();
      this.getOverallProductRating();
    }
  }

  getCurrentProductInfo() {
    $.get('/app', { 'id': this.state.currentProductId }, (currentProductInfo) => {
      this.setState({ currentProductInfo: currentProductInfo });
    });
  }

  getOverallProductRating() {
    console.log('HERE 1');
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
        //this.setState({overallProductRating: data.results});
      },
      error: (err) => {
        console.log('ERROR Getting Overall Rating: ', err.message);
      }
    });
  }

  // averageRatings(ratingsCountsObject) {
  //   var totalNumberReviews = 0;
  //   var sumOfRatings = 0;

  //   for (var key in ratingsCountsObject) {
  //     var currentRatingNumber = parseInt(key);
  //     var numberOfCurrentRating = parseInt(ratingsCountsObject[key]);
  //     var totalForRating = currentRatingNumber * numberOfCurrentRating;

  //     totalNumberReviews += numberOfCurrentRating;
  //     sumOfRatings += totalForRating;
  //   }

  //   return (sumOfRatings / totalNumberReviews);
  // }


  // Click handler for product cards. Should reset current product to clicked product and trigger rerender (and get product info for new current product)
  changeCurrentProduct(id) {
    this.setState({ currentProductId: id });
    console.log('App product ID: ', this.state.currentProductId);
  }


  render() {
    return (
      <div>
        <h1>MightyBaras Retail</h1>
        <div>
          <Overview apiIP={'http://localhost:3000'} productId={this.state.currentProductId} stars={<StarRating rating={'4'} />} />
          <RelatedOutfit currentProductId = {this.state.currentProductId} currentProductInfo = {this.state.currentProductInfo} changeCurrentProduct={this.changeCurrentProduct}/>
          <QuestionList currentProductId = {this.state.currentProductId} currentProductName={this.state.currentProductName} />
          <ReviewWidget currentProductId = {this.state.currentProductId} currentProductName = {this.state.currentProductName}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));


