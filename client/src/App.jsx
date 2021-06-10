import React from 'react';
import ReactDOM from 'react-dom';
import Overview from './components/overview/Overview.jsx';
import RelatedOutfit from './components/related/RelatedOutfit.jsx';
import QuestionsList from './components/questions/QuestionsList.jsx';
import ReviewWidget from './components/review/ReviewWidget.jsx';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      currentProductId: 22222
    };
  }
  render() {
    return (
      <div>
        <h1>Test</h1>
        <div>
          <Overview />
          <RelatedOutfit currentProductId = {this.state.currentProductId}/>
          <QuestionsList />
          <ReviewWidget currentProductId = {this.state.currentProductId} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

