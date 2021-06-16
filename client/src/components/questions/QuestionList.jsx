import React from 'react';
import axios from 'axios';
import Question from './Question.jsx';
import AddQuestionOrAnswer from './AddQuestionOrAnswer.jsx';

class QuestionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      questionsToDisplay: [],
      showMoreQuestionsButton: true,
      addQuestionModalOpen: false
    };
    this.productID = 22126;
    this.fetch = this.fetch.bind(this);
    this.clickMoreQuestionsButtonHandler = this.clickMoreQuestionsButtonHandler.bind(this);
    this.toggleAddQuestionModal = this.toggleAddQuestionModal.bind(this);

    this.fetch();
  }

  fetch() {
    return axios.get(`qa/questions?product_id=${this.productID}`)
      .then((response) => {
        this.setState({questions: response.data.results});
        this.setState({questionsToDisplay: response.data.results.slice(0, 2)});
        if (response.data.results.length <= 2 ) {
          this.setState({showMoreQuestionsButton: false});
        }
      })
      .catch((err) => {
        console.log('ERROR: ', err.messages);
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
        <div>
          <input id='search-questions' type='text' placeholder='HAVE A QUESTION? SEARCH FOR ANSWERS...'></input>
        </div>
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
        <AddQuestionOrAnswer addModalOpen={this.state.addQuestionModalOpen} toggleAddModal={this.toggleAddQuestionModal} isQuestionModal={true} />
      </div>
    );
  }
}

export default QuestionList;

