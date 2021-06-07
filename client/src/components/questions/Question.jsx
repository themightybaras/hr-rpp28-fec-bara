import React from 'react';
import AnswersList from './AnswersList.jsx';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <h3 className='question'>Q: {this.props.question.question_body}</h3>
        <AnswersList answers={Object.values(this.props.question.answers)} questionId={this.props.question.question_id} />
      </div>
    );
  }
}

export default Question;