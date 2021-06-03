import React from 'react';
import $ from 'jquery';

class QuestionsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.fetch = this.fetch.bind(this);

    this.fetch();
  }

  fetch() {
    $.ajax({
      type: 'GET',
      url: 'qa/questions',
      success: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log('ERROR: ', err.message);
      }
    });
  }

  render() {
    return (
      <div>
        <h3>Questions & Answers</h3>
      </div>
    );
  }
}

export default QuestionsList;

