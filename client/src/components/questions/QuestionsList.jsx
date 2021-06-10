import React from 'react';
import $ from 'jquery';
import Question from './Question.jsx';
import AddQuestion from './AddQuestion.jsx';

class QuestionsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      questionsToDisplay: [],
      showMoreQuestionsButton: false,
      addQuestionModalOpen: false
    };
    this.productID = 22126;
    this.fetch = this.fetch.bind(this);
    this.clickMoreQuestionsButtonHandler = this.clickMoreQuestionsButtonHandler.bind(this);
    this.toggleAddQuestionModal = this.toggleAddQuestionModal.bind(this);

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

  clickMoreQuestionsButtonHandler(event) {
    event.preventDefault();
    let nQuestionsToDisplay = this.state.questionsToDisplay.length + 2;
    this.setState({questionsToDisplay: this.state.questions.slice(0, nQuestionsToDisplay)});
    if (this.state.questions.length <= nQuestionsToDisplay) {
      this.setState({showMoreQuestionsButton: false});
    }
  }

  toggleAddQuestionModal(event) {
    event.preventDefault();
    this.setState({addQuestionModalOpen: !this.state.addQuestionModalOpen});
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
          <button type='button' className='add-question-button' onClick={this.toggleAddQuestionModal}>
            ADD A QUESTION +
          </button>
        </div>
        <AddQuestion addQuestionModalOpen={this.state.addQuestionModalOpen} toggleAddQuestionModal={this.toggleAddQuestionModal} />
      </div>
    );
  }
}

export default QuestionsList;

