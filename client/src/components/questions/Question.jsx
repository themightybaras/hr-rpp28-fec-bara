import React from 'react';
import AddQuestionOrAnswer from './AddQuestionOrAnswer.jsx';
import AnswerList from './AnswerList.jsx';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addAnswerModalOpen: false
    };
    this.toggleAddAnswerModal = this.toggleAddAnswerModal.bind(this);
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
          <a href='#' className='add-answer' onClick={this.toggleAddAnswerModal}>Add Answer</a>
        </div>
        <AnswerList answers={Object.values(this.props.question.answers)} questionId={this.props.question.question_id} />
        <AddQuestionOrAnswer addModalOpen={this.state.addAnswerModalOpen} toggleAddModal={this.toggleAddAnswerModal} isQuestionModal={false} />
      </div>
    );
  }
}

export default Question;