import React from 'react';
import $ from 'jquery';
import _ from 'underscore';
import ProductCard from './ProductCard.jsx';
import AddOutfitCard from './AddOutfitCard.jsx';

// Component to render carousel for either related products list or outfit items
// Take in one prop for related vs outfit, click handler to reset current product (pass to Card)

// If, then logic to distinguish API calls and state based on prop from Related

// Define methods for
//  Getting related products (GET request with current product id as data) - called in constructor
//  Getting product information for outfit items - called in constructor
//  Adding item (click handler) to outfit (GET request with cookie attached and current product id as data)
//    Server should simply respond with updated cookie

// if outfit, use rest parameter to map cards?
// Function to handle what to render based on local state (products)

class ItemsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      firstCard: 0
    };

    this.getRelatedProducts = this.getRelatedProducts.bind(this);
    this.getOutfit = this.getOutfit.bind(this);

    if (props.list === 'related') {
      this.getRelatedProducts(props.currentProductId);
    }
    if (props.list === 'outfit') {
      this.getOutfit();
      this.removeFromOutfit();
    }
  }

  getTitle () {
    if (this.props.list === 'related') {
      return 'Related Products';
    } else {
      return 'Outfit';
    }
  }

  getRelatedProducts(id) {
    $.get('/related', id, (products) => {
      // Use refs if this causes unnecessary rendering or long execution time
      this.setState({ products });
    });
  }

  getOutfit() {
    // get request to /outfit that parses cookie and gets info for all products
    $.get('/outfit', (products) => {
      this.setState({ products });
      console.log('Outfit:', products);
    });
  }

  addToOutfit() {
    if (!_.findWhere(this.state.products, {id: this.props.currentProductId})) {
      $.post('/outfit', { 'id': this.props.currentProductId.toString() }, (data) => {
        // Call getOutfit or reset state with current products (spread) plus current data
      });
    }
  }

  removeFromOutfit(id) {
    $.ajax({
      url: `/outfit?${id}`,
      type: 'DELETE',
      success: () => {
        //Remove from local state or call getOutfit
      }
    });

  }

  rightArrowClick() {
    if (this.state.firstCard < this.state.products.length - 3) {
      this.setState((state) => (
        { firstCard: state.firstCard + 1 }
      ));
    }
  }

  leftArrowClick() {
    if (this.state.firstCard > 0) {
      this.setState((state) => (
        { firstCard: state.firstCard - 1 }
      ));
    }
  }

  // Functions to render buttons based on currently displayed cards

  render() {
    return (
      <div >
        <h4>{this.getTitle()}</h4>
        <div className = "carousel">
          {this.state.firstCard > 0 ? <button type="button" onClick={this.leftArrowClick.bind(this)} style={{backgroundColor: 'white', border: 'none'}}> Left </button> : ''}
          {this.props.list === 'outfit' ? <AddOutfitCard addToOutfit={this.addToOutfit.bind(this)}/> : ''}
          {this.state.products.slice(this.state.firstCard, this.state.firstCard + 3).map((product, i) => {
            return <ProductCard key={i} product={product}/>;
          })}
          {this.state.firstCard < this.state.products.length - 3 ? <button type="button" onClick={this.rightArrowClick.bind(this)} style={{backgroundColor: 'white', border: 'none'}}> Right </button> : ''}
        </div>
      </div>
    );
  }
}

export default ItemsList;