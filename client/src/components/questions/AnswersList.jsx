import React from 'react';
import Answer from './Answer.jsx';

class AnswersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        {this.props.answers.map((element) => (
          <div key={element.id}><Answer answer={element} /></div>
        ))}
      </div>
    );
  }

}

export default AnswersList;