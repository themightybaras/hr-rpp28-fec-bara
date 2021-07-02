import React from 'react';
import axios from 'axios';
import _ from 'underscore';
import Question from './Question.jsx';
import AddQuestionOrAnswer from './AddQuestionOrAnswer.jsx';
import Track from '../../Track.jsx';

class QuestionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unfilteredQuestions: [],
      questions: [],
      questionsToDisplay: [],
      nInitialQuestions: 2,
      showMoreQuestionsButton: true,
      addQuestionModalOpen: false
    };
    this.nInitialQuestions = 2;
    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.searchQuestions = this.searchQuestions.bind(this);
    this.clickMoreQuestionsButtonHandler = this.clickMoreQuestionsButtonHandler.bind(this);
    this.toggleMoreQuestionsButton = this.toggleMoreQuestionsButton.bind(this);
    this.toggleAddQuestionModal = this.toggleAddQuestionModal.bind(this);
  }

  fetchQuestions() {
    return axios.get(`/qa/questions?product_id=${this.props.currentProductId}`)
      .then((response) => {
        var questions = _.sortBy(response.data.results, 'question_helpfulness').reverse();
        this.setState({unfilteredQuestions: questions});
        this.setState({questions: questions});
        this.setState({questionsToDisplay: this.state.questions.slice(0, this.nInitialQuestions)});
        this.toggleMoreQuestionsButton(questions.length, this.nInitialQuestions);
      })
      .catch((err) => {
        console.log('ERROR: ', err.messages);
      });
  }

  searchQuestions(event) {
    event.preventDefault();
    let searchTerm = event.target.value;
    let nQuestionsToDisplay = Math.max(this.state.questionsToDisplay.length, this.nInitialQuestions);
    if (searchTerm.length >= 3) {
      var filteredQuestions = _.filter(this.state.unfilteredQuestions, (element) => {
        return element.question_body.indexOf(searchTerm) > -1;
      });
      this.setState({questions: filteredQuestions});
      this.setState({questionsToDisplay: filteredQuestions.slice(0, nQuestionsToDisplay)});
      this.toggleMoreQuestionsButton(filteredQuestions.length, nQuestionsToDisplay);
    } else {
      this.setState({questions: this.state.unfilteredQuestions});
      this.setState({questionsToDisplay: this.state.unfilteredQuestions.slice(0, nQuestionsToDisplay)});
      this.toggleMoreQuestionsButton(this.state.unfilteredQuestions.length, nQuestionsToDisplay);
    }
  }

  clickMoreQuestionsButtonHandler(event) {
    event.preventDefault();
    let nQuestionsToDisplay = this.state.questionsToDisplay.length + this.nInitialQuestions;
    this.setState({questionsToDisplay: this.state.questions.slice(0, nQuestionsToDisplay)});
    this.toggleMoreQuestionsButton(this.state.questions.length, nQuestionsToDisplay);
  }

  toggleMoreQuestionsButton(nQuestions, nQuestionsToDisplay) {
    if (nQuestions <= nQuestionsToDisplay) {
      this.setState({showMoreQuestionsButton: false});
    } else {
      this.setState({showMoreQuestionsButton: true});
    }
  }

  toggleAddQuestionModal(event) {
    event.preventDefault();
    this.setState({addQuestionModalOpen: !this.state.addQuestionModalOpen});
  }

  componentDidMount() {
    this.fetchQuestions();
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentProductId !== prevProps.currentProductId) {
      this.fetchQuestions();
    }
  }

  render() {
    return (
      <div>
        <h3>QUESTIONS & ANSWERS</h3>
        <div id = 'question-widget'>
          <div>
            {this.state.unfilteredQuestions.length === 0 ? null : <input id='search-questions' type='text' onChange={this.searchQuestions} placeholder='HAVE A QUESTION? SEARCH FOR ANSWERS...'></input>}
          </div>
          <div id='question-list'>
            {this.state.questionsToDisplay.map((element) => (
              <div key={element.question_id}><Question question={element} ccurrentProductId={this.props.currentProductId} currentProductName={this.props.currentProductName} fetchQuestions={this.fetchQuestions} /></div>
            ))}
          </div>
          <br />
          <div>
            {this.state.showMoreQuestionsButton ?
              <Track>
                <div widget='Questions Widget' className='question-list-buttons'>
                  <button type='button' className='more-questions-button' onClick={this.clickMoreQuestionsButtonHandler}>MORE QUESTIONS</button>
                </div>
              </Track>
              : null}
            <Track>
              <div widget='Questions Widget' className='question-list-buttons'>
                <button type='button' className='add-question-button' onClick={this.toggleAddQuestionModal}>ADD A QUESTION +</button>
              </div>
            </Track>
          </div>
          <AddQuestionOrAnswer
            currentProductId={this.props.currentProductId}
            currentProductName={this.props.currentProductName}
            addModalOpen={this.state.addQuestionModalOpen}
            toggleAddModal={this.toggleAddQuestionModal}
            fetchQuestions={this.fetchQuestions}
            isQuestionModal={true} />
        </div>
      </div>
    );
  }
}

export default QuestionList;

