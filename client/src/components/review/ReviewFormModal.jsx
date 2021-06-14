import React from 'react';


class ReviewFormModal extends React.Component {

  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div>
        <div>{this.props.children}</div>
        <div>
          <button onClick = {this.props.onClose}>Close</button>
        </div>
      </div>);
  }
}


export default ReviewFormModal;