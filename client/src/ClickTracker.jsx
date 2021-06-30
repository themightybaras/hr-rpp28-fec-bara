import React from 'react';



class Tracker extends React.Component {
  constructor(props) {
    super(props);
  }

  onClick(event) {


    console.log('Tracking, widget: ', this.props.widget);
    console.log('Tracking, type: ', this.props.type);

  }

  render () {
    return React.Children.map(this.props.children, c =>
      React.cloneElement(c, {
        onClick: this.onClick.bind(c, c.props.onClick)
      })
    );
  }
}

export default Tracker;
