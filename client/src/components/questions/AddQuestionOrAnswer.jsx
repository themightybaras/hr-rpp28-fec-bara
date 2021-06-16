import React from 'react';

class AddQuestionOrAnswer extends React.Component {
  render() {
    return (
      <div className = {this.props.addModalOpen ? 'modal display-block' : 'modal display-none'}>
        <form>
          <div className='add-form-container'>
            <div className='add-your-question-or-answer-label'><b>{this.props.isQuestionModal ? 'Your Question' : 'Your Answer'}</b></div>
            <textarea name='your-question-or-answer' className='form-input' maxLength='1000' required />
            <br />
            <div className='add-your-nickname-label'><b>What is Your Nickname</b></div>
            <input type='text' name='your-nickname' className='form-input' maxLength='60' required />
            <br />
            <div className='add-your-email-label'><b>Your Email</b></div>
            <input type='text' name='your-email' className='form-input' maxLength='60' required />
            <br />
            <button type='button' className='add-question-or-answer-submit' onClick={this.props.toggleAddModal}>{this.props.isQuestionModal ? 'Submit Question' : 'Submit Answer'}</button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddQuestionOrAnswer;