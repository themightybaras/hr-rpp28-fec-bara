import React from 'react';
import ReactDOM from 'react-dom';
import Overview from './components/overview/Overview.jsx';
import RelatedOutfit from './components/related/RelatedOutfit.jsx';
import QuestionsList from './components/questions/QuestionsList.jsx';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {

    };
  }
  render() {
    return (
      <div>
        <h1>Test</h1>
        <Overview/>
        <RelatedOutfit/>
        <QuestionsList/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

