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
        <div className='answer-by'>by</div>
        <div className='answer-user' id={this.props.answer.answerer_name}>{this.props.answer.answerer_name}</div>
        <div className='answer-date'>{
          new Date(this.props.answer.date).toLocaleDateString({}, {timeZone: 'UTC', month: 'long', day: 'numeric', year: 'numeric'})}
        </div>
      </div>
    );
  }
}

export default Answer;