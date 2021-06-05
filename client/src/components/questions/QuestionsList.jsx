import React from 'react';
import $ from 'jquery';
import Question from './Question.jsx';

class QuestionsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: []
    };
    this.productID = 22126;
    this.fetch = this.fetch.bind(this);

    this.fetch();
  }

  fetch() {
    $.ajax({
      type: 'GET',
      url: `qa/questions?product_id=${this.productID}`,
      success: (data) => {
        this.setState({questions: data.results});
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
        <div>
          {this.state.questions.map((element) => (
            <div key={element.question_id}><Question question={element} /></div>
          ))}
        </div>
      </div>
    );
  }
}

export default QuestionsList;

