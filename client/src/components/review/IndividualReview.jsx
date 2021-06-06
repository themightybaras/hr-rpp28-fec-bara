// this will be the fomatter for each individual card

import React from 'react';

// class component with state
class IndividualReview extends React.Component {
  constructor(props) {
    super(props);
    // state will be for helpful and reported
    this.state = {
      reported: false,
      helpful: false
    };
  }

  // function for helpful
  // api add helpful

  // function for report
  // api report

  // render ()
  // style??
  // return ()
  // single list item with ....
  // star rating and display
  //date
  // summary sentance
  // review body
  // recommend
  // reviewer name
  // response
  // rating helpfulness
  // report clickable
  render(props) {
    return (
      <div>
        <span>Star Rating:</span><br/>
        <span>Date</span><br/>
        <span>Summary Sentance</span><br/>
        <p>Body</p><br/>
        <span>Recommended?</span><br/>
        <span>Reviewer Name</span><br/>
        <span>Response From Seller</span><br/>
        <button>Helpful (number of helpful votes)</button>
        <button>Report</button>
        <br/>
        <span>---------------------------------------------------------</span>
      </div>
    );
  }
}

export default IndividualReview;