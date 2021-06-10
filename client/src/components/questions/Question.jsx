import React from 'react';
import AddAnswer from './AddAnswer.jsx';
import AnswersList from './AnswersList.jsx';

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
        <AnswersList answers={Object.values(this.props.question.answers)} questionId={this.props.question.question_id} />
        <AddAnswer addAnswerModalOpen={this.state.addAnswerModalOpen} toggleAddAnswerModal={this.toggleAddAnswerModal} />
      </div>
    );
  }
}

export default Question;