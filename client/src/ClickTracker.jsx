import React from 'react';

const ImageTracker = ({widget, type, children, product}) => {

  console.log('Tracking, products: ', product);
  console.log('Tracking, widget: ', widget);
  console.log('Tracking, type: ', type);

  return (
    children
  );

};


class ClickTracker extends React.Component {
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

export { ClickTracker, ImageTracker };


