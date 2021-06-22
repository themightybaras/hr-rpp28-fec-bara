import axios from 'axios';
import React from 'react';
import AddQuestionOrAnswer from './AddQuestionOrAnswer.jsx';
import AnswerList from './AnswerList.jsx';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addAnswerModalOpen: false,
      markedHelpful: false
    };
    this.markAnswerHelpful = this.markAnswerHelpful.bind(this);
    this.addHelpfulCount = this.addHelpfulCount.bind(this);
    this.toggleAddAnswerModal = this.toggleAddAnswerModal.bind(this);
  }

  markAnswerHelpful(event) {
    event.preventDefault();
    console.log('mark answer helpful');
    //this.addHelpfulCount();
  }

  addHelpfulCount() {
    axios.put(`/qa/questions/${this.props.question.question_id}/helpful`)
      .then((response) => {
        this.setState({markedHelpful: true});
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  toggleAddAnswerModal(event) {
    event.preventDefault();
    this.setState({addAnswerModalOpen: !this.state.addAnswerModalOpen});
  }

  render() {
    return (
      <div>
        <div id='question-container'>
          <div className='question'><b>Q: {this.props.question.question_body}</b></div>
          <div id='question-container-right-upper-corner'>
            <div>Helpful?</div>
            {this.state.markedHelpful ? <div>Yes</div> : <a href='#' className='mark-answer-helpful' onClick={this.markAnswerHelpful}>Yes</a>}
            <div>({this.props.question.question_helpfulness})</div>
            <div></div><div>|</div><div></div>
            <a href='#' className='add-answer' onClick={this.toggleAddAnswerModal}>Add Answer</a>
          </div>
        </div>
        <AnswerList answers={Object.values(this.props.question.answers)} questionId={this.props.question.question_id} />
        <AddQuestionOrAnswer
          currentProductId={this.props.currentProductId}
          currentProductName={this.props.currentProductName}
          question={this.props.question}
          addModalOpen={this.state.addAnswerModalOpen}
          toggleAddModal={this.toggleAddAnswerModal}
          isQuestionModal={false} />
      </div>
    );
  }
}

export default Question;