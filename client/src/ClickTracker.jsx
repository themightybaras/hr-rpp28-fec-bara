import React from 'react';
import axios from 'axios';

class ClickTracker extends React.Component {
  constructor(props) {
    super(props);
  }

  onClick(event) {


    // console.log('Tracking, widget: ', this.props.widget);
    // console.log('Tracking, type: ', this.props.type);
    var clickObject = {
      time: new Date (Date.now()),
      widget: this.props.widget,
      element: this.props.type
    };

    axios.post('/interactions', clickObject )
      .then((response) => {
        // console.log(response);
      })
      .catch((err) => {
        console.log(err.message);
      });


  }

  render () {
    return React.Children.map(this.props.children, c =>
      React.cloneElement(c, {
        onClick: this.onClick.bind(c, c.props.onClick)
      })
    );
  }
}

export default ClickTracker;


