import React from 'react';
import ReactDOM from 'react-dom';

class Overview extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }
  render() {
    return (
      <div id="container">
        <h2>Overview</h2>
        <div id="carousel">

        </div>
        <div id="style-selector">
        </div>
        <div id="cart">

        </div>
      </div>
    );
  }
}

export default Overview;