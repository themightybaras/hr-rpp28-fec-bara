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
      currentProductInfo: {}
    };

    this.getCurrentProductInfo.bind(this);
    this.changeCurrentProduct.bind(this);
    this.getCurrentProductInfo();
  }


  getCurrentProductInfo() {
    // API call for currentProductID
    $.get('/app', { 'id': this.state.currentProductId }, (currentProductInfo) => {
      // Use refs if this causes unnecessary rendering or long execution time
      this.setState({ currentProductInfo: currentProductInfo });
    });

    // Set state upon completion
  }

  // Click handler for product cards
  changeCurrentProduct(id) {
    // set state to input id
  }

  render() {
    return (
      <div>
        <h1>The MightyBaras Project Atelier</h1>
        <div>
          <Placeholder />
          <RelatedOutfit currentProductId = {this.state.currentProductId}/>
          <QuestionList />
          <ReviewWidget currentProductId = {this.state.currentProductId} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

