import React from 'react';
import ReactDOM from 'react-dom';
import Overview from './components/overview/Overview.jsx';
import Placeholder from './components/overview/Placeholder.jsx';
import RelatedOutfit from './components/related/RelatedOutfit.jsx';
import QuestionList from './components/questions/QuestionList.jsx';
import ReviewWidget from './components/review/ReviewWidget.jsx';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      currentProductId: 22161
    };
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

