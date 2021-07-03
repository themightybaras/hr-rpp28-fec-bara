import React from 'react';
import ReactDOM from 'react-dom';
// import Overview from 'overview-module';
import Overview from './components/overview/Overview.jsx';
import RelatedOutfit from './components/related/RelatedOutfit.jsx';
import QuestionList from './components/questions/QuestionList.jsx';
import ReviewWidget from './components/review/ReviewWidget.jsx';
import StarRating from './components/review/StarRating.jsx';
import $ from 'jquery';
import apiIP from '../../apiIP.js';


class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      darkTheme: false,
      currentProductId: 22161,
      currentProductName: 'Adell 300 Shoes',
      overallProductRating: 0,
      reviewMetaData: {},
      currentProductInfo: {
        id: 22161,
        campus: 'hr-rpp',
        name: 'Adell 300 Shoes',
        slogan: 'Doloribus voluptas impedit est qui voluptates omnis non omnis soluta.',
        description: 'Ex molestiae maxime atque ullam quod perspiciatis aut corporis. Perspiciatis consectetur soluta quos corrupti error aut qui est provident. Voluptatem cum id totam temporibus velit rem deleniti.',
        category: 'Shoes',
        'default_price': '129.00',
        'created_at': '2021-03-18T16:09:31.545Z',
        'updated_at': '2021-03-18T16:09:31.545Z',
        features: [
          { feature: 'Cut', value: '"Skinny"' },
          { feature: 'Stitching', value: '"Double Stitch"' },
          { feature: 'Non-GMO', value: null }
        ]
      }
    };

    this.getCurrentProductInfo = this.getCurrentProductInfo.bind(this);
    this.changeCurrentProduct = this.changeCurrentProduct.bind(this);
    this.getReviewMetaData = this.getReviewMetaData.bind(this);
    this.changeTheme = this.changeTheme.bind(this);
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
          if (JSON.stringify(ratingsCountsObject) === JSON.stringify({})) {
            return 0;
          }

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

  // Click handler for product cards. Should reset current product to clicked product and trigger rerender (and get product info for new current product)
  changeCurrentProduct(id) {
    this.setState({ currentProductId: id });
    //console.log('App product ID: ', this.state.currentProductId);
  }

  changeTheme(e) {
    this.setState(state => ({
      darkTheme: !this.state.darkTheme
    }));
  }


  render() {
    return (
      <div className = {this.state.darkTheme ? 'theme-dark' : 'theme-light'}>
        <div>
          <div id='pageHead'>
            <h1 id= 'pageTitle'>MightyBaras 🦆 Retail</h1>
            <button id='themebutton' onClick={this.changeTheme}>{this.state.darkTheme ? 'Light Mode ☀' : 'Dark Mode ☽︎'}</button>
          </div>
          <div>
            <Overview apiIP={apiIP} productId={this.state.currentProductId} stars={<StarRating rating={this.state.overallProductRating} />} />
            <RelatedOutfit currentProductId = {this.state.currentProductId} currentProductInfo = {this.state.currentProductInfo} changeCurrentProduct={this.changeCurrentProduct}/>
            <QuestionList currentProductId = {this.state.currentProductId} currentProductName={this.state.currentProductName} />
            <ReviewWidget currentProductId = {this.state.currentProductId} currentProductName = {this.state.currentProductName} overallProductRating = {this.state.overallProductRating} reviewMetaData= {this.state.reviewMetaData}/>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));


