import React from 'react';
import $ from 'jquery';
import Question from './Question.jsx';

class QuestionsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      questionsToDisplay: [],
      showMoreQuestionsButton: false
    };
    this.productID = 22126;
    this.fetch = this.fetch.bind(this);
    this.clickMoreQuestionsButtonHandler = this.clickMoreQuestionsButtonHandler.bind(this);

    this.fetch();
  }

  fetch() {
    $.ajax({
      type: 'GET',
      url: `qa/questions?product_id=${this.productID}`,
      success: (data) => {
        this.setState({questions: data.results});
        this.setState({questionsToDisplay: data.results.slice(0, 2)});
        if (data.results.length > 2 ) {
          this.setState({showMoreQuestionsButton: true});
        }
      },
      error: (err) => {
        console.log('ERROR: ', err.message);
      }
    });
  }

  clickMoreQuestionsButtonHandler(e) {
    e.preventDefault();
    let nQuestionsToDisplay = this.state.questionsToDisplay.length + 2;
    this.setState({questionsToDisplay: this.state.questions.slice(0, nQuestionsToDisplay)});
    if (this.state.questions.length <= nQuestionsToDisplay) {
      this.setState({showMoreQuestionsButton: false});
    }
  }

  render() {
    return (
      <div>
        <h3>Questions & Answers</h3>
        <div id='questions-list'>
          {this.state.questionsToDisplay.map((element) => (
            <div key={element.question_id}><Question question={element} /></div>
          ))}
        </div>
        <br />
        <div>
          {this.state.showMoreQuestionsButton ?
            <button type='button' className='more-questions-button' onClick={this.clickMoreQuestionsButtonHandler}>
              MORE QUESTIONS
            </button> : null}
        </div>
      </div>
    );
  }
}

export default QuestionsList;

