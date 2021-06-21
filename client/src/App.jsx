import React from 'react';
import ReactDOM from 'react-dom';
import Overview from './components/overview/Overview.jsx';
import Placeholder from './components/overview/Placeholder.jsx';
import RelatedOutfit from './components/related/RelatedOutfit.jsx';
import QuestionList from './components/questions/QuestionList.jsx';
import ReviewWidget from './components/review/ReviewWidget.jsx';
import $ from 'jquery';


class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      currentProductId: 22161,
      currentProductName: 'CURRENT PRODUCT NAME',
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
    // console.log('App: called method to retrieve current product data');
    $.get('/app', { 'id': this.state.currentProductId }, (currentProductInfo) => {
      this.setState({ currentProductInfo: currentProductInfo });
    });
  }

  // Click handler for product cards. Should reset current product to clicked product and trigger rerender (and get product info for new current product)
  changeCurrentProduct(id) {
    this.setState({ currentProductId: id });
  }


  render() {
    return (
      <div>
        <h1>The MightyBaras Project Atelier</h1>
        <div>
          <Placeholder currentProductId = {this.state.currentProductId}/>
          <RelatedOutfit currentProductId = {this.state.currentProductId} currentProductInfo = {this.state.currentProductInfo} changeCurrentProduct={this.changeCurrentProduct}/>
          <QuestionList />
          <ReviewWidget currentProductId = {this.state.currentProductId} currentProductName = {this.state.currentProductName}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

