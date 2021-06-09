import React from 'react';

class AddQuestion extends React.Component {

  render() {
    return (
      <div className = {this.props.addQuestionModalOpen ? 'modal display-block' : 'modal display-none'}>
        <form>

          <div className='add-question-form-container'>
            <label for='your-question'><b>Your Question</b></label>
            <br />
            <textarea id='your-question' name='your-question' required />
            <br />
            <label for='your-nickname'><b>What is Your Nickname</b></label>
            <br />
            <input type='text' id='your-nickname' name='your-nickname' required />
          </div>

        </form>
      </div>
    );
  }
}

export default AddQuestion;