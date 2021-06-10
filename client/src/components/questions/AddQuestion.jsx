import React from 'react';

class AddQuestion extends React.Component {
  render() {
    return (
      <div className = {this.props.addQuestionModalOpen ? 'modal display-block' : 'modal display-none'}>
        <form>
          <div className='add-form-container'>
            <div><b>Your Question</b></div>
            <textarea name='your-question' className='form-input' maxLength='1000' required />
            <br />
            <div><b>What is Your Nickname</b></div>
            <input type='text' name='your-nickname' className='form-input' maxLength='60' required />
            <br />
            <div><b>Your Email</b></div>
            <input type='text' name='your-email' className='form-input' maxLength='60' required />
            <br />
            <button type='button' onClick={this.props.toggleAddQuestionModal}>Submit Question</button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddQuestion;