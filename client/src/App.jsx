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
      currentProductInfo: {}
    };

    this.getCurrentProductInfo = this.getCurrentProductInfo.bind(this);
    this.changeCurrentProduct = this.changeCurrentProduct.bind(this);

    this.getCurrentProductInfo();

  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentProductId !== prevState.currentProductId) {
      this.getCurrentProductInfo();
    }
  }

  getCurrentProductInfo() {
    $.get('/app', { 'id': this.state.currentProductId }, (currentProductInfo) => {
      this.setState({ currentProductInfo: currentProductInfo });
    });
  }

  // Click handler for product cards. Should reset current product to clicked product and trigger rerender (and get product info for new current product)
  changeCurrentProduct(id) {
    this.setState({ currentProductId: id });
    console.log('App product ID: ', this.state.currentProductId);
  }


  render() {
    return (
      <div>
        <h1>The MightyBaras Project Atelier</h1>
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


