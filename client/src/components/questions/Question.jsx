import axios from 'axios';
import React from 'react';
import _ from 'underscore';
import AddQuestionOrAnswer from './AddQuestionOrAnswer.jsx';
import AnswerList from './AnswerList.jsx';
import Track from '../../Track.jsx';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      addAnswerModalOpen: false,
      markedQuestionHelpful: false
    };
    this.markQuestionHelpful = this.markQuestionHelpful.bind(this);
    this.toggleAddAnswerModal = this.toggleAddAnswerModal.bind(this);
    this.sortAnswers = this.sortAnswers.bind(this);
  }

  markQuestionHelpful(event) {
    event.preventDefault();
    axios.put(`/qa/questions/${this.props.question.question_id}/helpful`)
      .then(() => {
        this.setState({markedQuestionHelpful: true});
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  toggleAddAnswerModal(event) {
    event.preventDefault();
    this.setState({addAnswerModalOpen: !this.state.addAnswerModalOpen});
  }

  sortAnswers() {
    const sortedAnswers = _.sortBy(Object.values(this.props.question.answers), 'helpfulness').reverse();
    const sortedAnswersWithSellerAtTop = [
      ...sortedAnswers.filter((element) => element.answerer_name.toLowerCase() === 'seller'),
      ...sortedAnswers.filter((element) => element.answerer_name.toLowerCase() !== 'seller')
    ];
    return sortedAnswersWithSellerAtTop;
  }

  render() {
    return (
      <div>
        <div id='question-container'>
          <div className='question'><b>Q: {this.props.question.question_body}</b></div>
          <div id='question-container-right'>
            <div>Helpful?</div>
            {this.state.markedQuestionHelpful ? <span>Yes</span> :
              <Track>
                <div widget='Questions Widget'>
                  <div className='hyperlink' onClick={this.markQuestionHelpful}>Yes</div>
                </div>
              </Track>}
            <div>({this.state.markedQuestionHelpful ? this.props.question.question_helpfulness + 1 : this.props.question.question_helpfulness})</div>
            <div></div><div>|</div><div></div>
            <Track>
              <div widget='Questions Widget'>
                <div className='hyperlink' onClick={this.toggleAddAnswerModal}>Add Answer</div>
              </div>
            </Track>
          </div>
        </div>
        <AnswerList answers={this.sortAnswers()} questionId={this.props.question.question_id} />
        <AddQuestionOrAnswer
          currentProductId={this.props.currentProductId}
          currentProductName={this.props.currentProductName}
          question={this.props.question}
          addModalOpen={this.state.addAnswerModalOpen}
          toggleAddModal={this.toggleAddAnswerModal}
          fetchQuestions={this.props.fetchQuestions}
          isQuestionModal={false} />
      </div>
    );
  }
}

export default Question;