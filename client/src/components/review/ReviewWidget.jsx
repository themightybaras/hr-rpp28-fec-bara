// overall component for review/rating widget
// as you code, you will need to import each new component and return it withtin render

import React from 'react';

class ReviewWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortBy: 'Relevance',
      displayXReviews: 2,
      filters: []
      //more things to keep track of ?
    };
  }

  //functions that will need to be passed to different components as props

  render () {
    return (
      <div>
        <h3>REVIEW AND RATING WIDGET</h3>
      </div>
    );
  }
}

// this will be imported by app.jsx
export default ReviewWidget;