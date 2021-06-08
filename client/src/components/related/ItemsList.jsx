import React from 'react';
import $ from 'jquery';
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
const CardRender = ({products, firstCard}) => {
  if (products.length > 0) {
    return products.slice(firstCard, firstCard + 3).map((product, i) => {
      return <ProductCard key={i} product={product}/>;
    });
  } else {
    return '';
  }
};


class ItemsList extends React.Component {
  constructor(props) {
    super(props);
    // MOVE THIS INTO LAST BLOCK OF ASYNC FUNCTION?
    this.state = {
      products: [{}],
      firstCard: 0
    };

    this.getRelatedProducts = this.getRelatedProducts.bind(this);
    // CALL getRelatedPrdocuts
    if (props.list === 'related') {
      this.getRelatedProducts(props.currentProductId);
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
    // Ajax GET request to server based on input with data
    $.get('/related', id, (data) => {
      // Use refs if this causes unnecessary rendering or long execution time
      this.setState({ products: data });
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
    if (this.state.products[0].id) {
      return (
        <div >
          <h4>{this.getTitle()}</h4>
          <div className = "carousel">
            {this.state.firstCard > 0 ? <button type="button" onClick={this.leftArrowClick.bind(this)} style={{backgroundColor: 'white', border: 'none'}}> Left </button> : ''}
            <CardRender products={this.state.products} firstCard={this.state.firstCard}/>
            {this.state.firstCard < this.state.products.length - 3 ? <button type="button" onClick={this.rightArrowClick.bind(this)} style={{backgroundColor: 'white', border: 'none'}}> Right </button> : ''}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h4>{this.getTitle()}</h4>
          No products
        </div>
      );
    }
  }
}

export default ItemsList;