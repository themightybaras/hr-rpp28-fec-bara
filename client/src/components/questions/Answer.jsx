import React from 'react';
import axios from 'axios';
import Track from '../../Track.jsx';

class Answer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markedAnswerHelpful: false,
      reportedAnswer: false
    };
    this.markAnswerHelpful = this.markAnswerHelpful.bind(this);
    this.reportAnswer = this.reportAnswer.bind(this);
  }

  markAnswerHelpful(event) {
    event.preventDefault();
    axios.put(`/qa/answers/${this.props.answer.id}/helpful`)
      .then(() => {
        this.setState({markedAnswerHelpful: true});
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  reportAnswer(event) {
    event.preventDefault();
    axios.put(`/qa/answers/${this.props.answer.id}/report`)
      .then(() => {
        this.setState({reportedAnswer: true});
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  render() {
    return (
      <div>
        <h3 className='answer-marker'>A: </h3>
        <div className='answer'>{this.props.answer.body}</div>
        <br />
        <div className = 'answer-images'>
          {this.props.answer.photos.map((photo, index) => (
            <img src = {photo} key={`${this.props.answer.id}-${index}`} className= 'answer-image'/>
          ))}
        </div>
        <div id='answer-container-bottom'>
          <div className='answer-by'>by</div>
          <div className='answer-user' id={this.props.answer.answerer_name.toLowerCase()}>{this.props.answer.answerer_name},</div>
          <div className='answer-date'>{
            new Date(this.props.answer.date).toLocaleDateString({}, {timeZone: 'UTC', month: 'long', day: 'numeric', year: 'numeric'})}
          </div>
          <div></div><div>|</div><div></div>
          <div>Helpful?</div>
          {this.state.markedAnswerHelpful ? <span>Yes</span> :
            <Track>
              <div widget = 'Questions Widget'>
                <a href='#' onClick={this.markAnswerHelpful}>Yes</a>
              </div>
            </Track>}
          <div>({this.state.markedAnswerHelpful ? this.props.answer.helpfulness + 1 : this.props.answer.helpfulness})</div>
          <div></div><div>|</div><div></div>
          {this.state.reportedAnswer ? <span>Reported</span> :
            <Track>
              <div widget = 'Questions Widget'>
                <a href='#' onClick={this.reportAnswer}>Report</a>
              </div>
            </Track>}
        </div>
      </div>
    );
  }
}

export default Answer;