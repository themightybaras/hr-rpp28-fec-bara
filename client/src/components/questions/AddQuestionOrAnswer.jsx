import React from 'react';
import axios from 'axios';
import $ from 'jquery';

class AddQuestionOrAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: '',
      name: '',
      email: ''
    };
    this.changeContentHandler = this.changeContentHandler.bind(this);
    this.changeNicknameHandler = this.changeNicknameHandler.bind(this);
    this.changeEmailHandler = this.changeEmailHandler.bind(this);
    this.clickSubmitHandler = this.clickSubmitHandler.bind(this);
    this.isFormValidated = this.isFormValidated.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.create = this.create.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  changeContentHandler(event) {
    event.preventDefault();
    this.setState({body: event.target.value});
  }

  changeNicknameHandler(event) {
    event.preventDefault();
    this.setState({name: event.target.value});
  }

  changeEmailHandler(event) {
    event.preventDefault();
    this.setState({email: event.target.value});
  }

  clickSubmitHandler(event) {
    event.preventDefault();
    if (this.isFormValidated()) {
      this.create();
      this.props.toggleAddModal(event);
    }
  }

  isFormValidated() {
    if (this.props.isQuestionModal) {
      var formId = document.querySelector('#question-form');
    } else {
      var formId = document.querySelector(`#answer-${this.props.question.question_id}-form`);
    }
    var formInput = formId.getElementsByClassName('form-input');

    var isBodyMissing = formInput['your-question-or-answer'].validity.valueMissing;
    var isNameMissing = formInput['your-nickname'].validity.valueMissing;
    var isEmailMissing = formInput['your-email'].validity.valueMissing;
    var isEmailFormatIncorrect = formInput['your-email'].validity.typeMismatch;
    // COMMENTED OUT FOR LINTER
    //var errMessage = createErrMsg(this.props.isQuestionModal, isBodyMissing, isNameMissing, isEmailMissing, isEmailFormatIncorrect);
    if (errMessage !== '') {
      alert(errMessage);
      return false;
    }

    return true;
  }

  clearForm() {
    $('.form-input').val('');
    this.setState({body: '', name: '', email: ''});
  }

  create() {
    if (this.props.isQuestionModal) {
      var url = '/qa/questions';
      // COMMENTED OUT FOR LINTER
      //var data = { ...this.state, product_id: this.props.currentProductId };
    } else {
      var url = `/qa/questions/${this.props.question.question_id}/answers`;
      var data = this.state;
    }
    axios.post(url, data)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  closeModal(event) {
    event.preventDefault();
    this.clearForm();
    this.props.toggleAddModal(event);
  }

  render() {
    return (
      <div className = {this.props.addModalOpen ? 'modal display-block' : 'modal display-none'}>

        <form id={this.props.isQuestionModal ? 'question-form' : `answer-${this.props.question.question_id}-form`}>
          <div className='add-form-container'>
            <button type='button' className='close-modal' onClick={this.closeModal} >&times;</button>
            <h2 className='modal-title-question-or-answer'>{this.props.isQuestionModal ? 'Ask Your Question' : 'Submit Your Answer'}</h2>
            <h3 className='modal-subtitle-question-or-answer'>{this.props.isQuestionModal ? `About the ${this.props.currentProductName}` : `${this.props.currentProductName}: ${this.props.question.question_body}`}</h3>
            <div className='add-your-question-or-answer-label'><b>{this.props.isQuestionModal ? 'Your Question*' : 'Your Answer*'}</b></div>
            <textarea name='your-question-or-answer' className='form-input' maxLength='1000' onChange={this.changeContentHandler} required />
            <br />
            <br />
            <div className='add-your-nickname-label'><b>What is Your Nickname*</b></div>
            <input type='text' name='your-nickname' className='form-input' maxLength='60' onChange={this.changeNicknameHandler} placeholder='Example: jack543!' required />
            <br />
            <div>For privacy reasons, do not use your full name or email address.</div>
            <br />
            <div className='add-your-email-label'><b>Your Email*</b></div>
            <input type='email' name='your-email' className='form-input' maxLength='60' onChange={this.changeEmailHandler} placeholder='Example: jack@email.com' required />
            <br />
            <div>For authentication reasons, you will not be emailed.</div>
            <br />
            {this.props.isQuestionModal ? <div></div> : <button type='button' className='upload-your-photos'>Upload Your Photos</button>}
            <br />
            <button type='button' className='add-question-or-answer-submit' onClick={this.clickSubmitHandler}>{this.props.isQuestionModal ? 'Submit Question' : 'Submit Answer'}</button>
            <br />
          </div>
        </form>
      </div>
    );
  }
}



const createErrMsg = (isQuestionModal, isBodyMissing, isNameMissing, isEmailMissing, isEmailFormatIncorrect) => {
  var errMessage = '';

  if (isBodyMissing || isNameMissing || isEmailMissing) {
    errMessage += 'You must enter the following: \n';
    if (isBodyMissing) {
      if (isQuestionModal) {
        errMessage += 'Your Question \n';
      } else {
        errMessage += 'Your Answer \n';
      }
    }
    if (isNameMissing) {
      errMessage += 'Your Nickname \n';
    }
    if (isEmailMissing) {
      errMessage += 'Your Email \n';
    }
    errMessage += '\n';
  }
  if (!isEmailMissing && isEmailFormatIncorrect) {
    errMessage += 'You must enter a valid email address.\n\n';
  }

  return errMessage;
};

export default AddQuestionOrAnswer;



