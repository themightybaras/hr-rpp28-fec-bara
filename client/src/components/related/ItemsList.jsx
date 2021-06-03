import React from 'react';

// Component to render carousel for either related products list or outfit items
// Stateful component
// Take in one prop for related vs outfit, click handler to reset current product (pass to Card)

// If, then logic to distinguish API calls and state based on prop from Related

// Define methods for
//  Getting related products (GET request with current product id as data) - called in constructor
//  Getting product information for outfit items - called in constructor
//  Adding item (click handler) to outfit (GET request with cookie attached and current product id as data)
//    Server should simply respond with updated cookie


// if outfit, use rest parameter to map cards?

class ItemsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [{}]
    };
  }

  render() {
    return (
      <div>
        {this.props.list === 'related' ? 'related' : 'outfit'}
      </div>
    );
  }
}

export default ItemsList;