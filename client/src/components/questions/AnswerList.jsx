import React from 'react';
import Answer from './Answer.jsx';
import $ from 'jquery';

class AnswerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answersToDisplay: props.answers.slice(0, 2),
      showMoreAnswersButton: false,
      seeMoreAnswers: true
    };
    this.clickMoreAnswersButtonHandler = this.clickMoreAnswersButtonHandler.bind(this);
  }

  componentDidMount() {
    if (this.props.answers.length > 2) {
      this.setState({showMoreAnswersButton: true});
    }
  }

  clickMoreAnswersButtonHandler(e) {
    e.preventDefault();
    if (this.state.seeMoreAnswers) {
      this.setState({answersToDisplay: this.props.answers});
      $(`#${this.props.questionId}`).html('COLLAPSE ANSWERS');
    } else {
      this.setState({answersToDisplay: this.props.answers.slice(0, 2)});
      $(`#${this.props.questionId}`).html('SEE MORE ANSWERS');
    }
    this.setState({seeMoreAnswers: !this.state.seeMoreAnswers});
  }

  render() {
    return (
      <div>
        <div id='answers-list'>
          {this.state.answersToDisplay.map((element) => (
            <div key={element.id}><Answer answer={element} /></div>
          ))}
        </div>
        <br />
        <div>
          {this.state.showMoreAnswersButton ?
            <button type='button' className='more-answers-button' id={this.props.questionId} onClick={this.clickMoreAnswersButtonHandler}>
              SEE MORE ANSWERS
            </button> : null}
        </div>
      </div>
    );
  }

}

export default AnswerList;