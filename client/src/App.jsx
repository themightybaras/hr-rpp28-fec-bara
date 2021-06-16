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

    this.getCurrentProductInfo = this.getCurrentProductInfo.bind(this);
    this.changeCurrentProduct = this.changeCurrentProduct.bind(this);
  }

  componentDidMount() {
    this.getCurrentProductInfo();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('Previous state: ', prevState); // this is always logging an empty object
    console.log('Current state: ', this.state);
    if (this.state.currentProductId !== prevState.currentProductId) {
      this.getCurrentProductInfo();
      console.log('how many?');
    }
    console.log('State after product call', this.state);
  }

  getCurrentProductInfo() {
    $.get('/app', { 'id': this.state.currentProductId }, (currentProductInfo) => {
      this.setState({ currentProductInfo: currentProductInfo });
    });
  }

  // Click handler for product cards
  changeCurrentProduct(id) {
    // this.setState((state) => {
    //   return { currentProductId: state.currentProductId - state.currentProductId + id };
    // });
    this.setState({ currentProductId: id });
    //this.getCurrentProductInfo();
  }

  render() {
    return (
      <div>
        <h1>The MightyBaras Project Atelier</h1>
        <div>
          <Placeholder currentProductId = {this.state.currentProductId}/>
          <RelatedOutfit currentProductId = {this.state.currentProductId} changeCurrentProduct={this.changeCurrentProduct}/>
          <QuestionList />
          <ReviewWidget currentProductId = {this.state.currentProductId} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

