import React from 'react';

class Answer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h3 className='answer-marker'>A: </h3>
        <div className='answer'>{this.props.answer.body}</div>
        <br />
        <div className='answer-user'>by {this.props.answer.answerer_name}</div>
        <div className='answer-date'>{this.props.answer.date.split('T')[0]}</div>
      </div>
    );
  }
}

export default Answer;