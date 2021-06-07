import React from 'react';
import $ from 'jquery';
import ProductCard from './ProductCard.jsx';

// Component to render carousel for either related products list or outfit items
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
      products: [{}],
      firstCard: 0
    };
    this.getProducts.bind(this);
    this.getProducts();
    // this.getProducts(this.props.list);
  }

  getTitle () {
    if (this.props.list === 'related') {
      return 'Related Products';
    } else {
      return 'Outfit';
    }
  }

  // getProducts(endpoint) {
  getProducts() {
    // Ajax GET request to server based on input with data
    $.get('/related', 22126, (data) => {
      // console.log('Result from product calls: ', data);
      // console.log('image? ', data[0].results[0].photos[0]);
      // console.log('image? ', data[0].results[0].photos[0].thumbnail_url);
      // Use refs if this causes unnecessary rendering or long execution time
      this.setState({ products: data});
    });
  }

  rightArrowClick() {
    if (this.state.firstCard < this.state.products.length - 3) {
      this.setState((state) => (
        { firstCard: state.firstCard + 1}
      ));
    }
  }

  leftArrowClick() {
    if (this.state.firstCard > 0) {
      this.setState((state) => (
        { firstCard: state.firstCard - 1}
      ));
    }
  }

  render() {

    return (
      <div >
        <h4>{this.getTitle()}</h4>
        <div className = "carousel">
          <button type="button" onClick={this.leftArrowClick.bind(this)} style={{backgroundColor: 'white', border: 'none'}}> Left </button>
          {this.state.products.slice(this.state.firstCard, this.state.firstCard + 3).map((product, i) => {
            return <ProductCard key={i} name={product.name} />;
          })}
          <button type="button" onClick={this.rightArrowClick.bind(this)} style={{backgroundColor: 'white', border: 'none'}}> Right </button>
        </div>
      </div>
    );
  }
}

export default ItemsList;