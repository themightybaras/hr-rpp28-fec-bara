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
  render() {
    return (
      <h1>SOMETHING</h1>
    );
  }
}

export default IndividualReview;