import React from 'react';
import axios from 'axios';


class Track extends React.Component {

  onClick(event) {

    var clickObject = {
      time: new Date (Date.now()),
      widget: this.props.widget,
      element: this.props.children.type
    };

    axios.post('/interactions', clickObject)
      .then((response) => {
        console.log(response);
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

export default Track;
