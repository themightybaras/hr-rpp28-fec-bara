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
      // currentProductId: props.currentProductId,
      products: [],
      firstCard: 0
    };

    this.getRelatedProducts = this.getRelatedProducts.bind(this);
    this.getOutfit = this.getOutfit.bind(this);
    this.removeFromOutfit = this.removeFromOutfit.bind(this);
    this.addToOutfit = this.addToOutfit.bind(this);

    // if (props.list === 'related') {
    //   console.log('ItemsList: related constructor');
    //   this.getRelatedProducts(this.props.currentProductId);
    // }
    // if (props.list === 'outfit') {
    //   console.log('ItemsList: outfit constructor');
    //   this.getOutfit();
    // }
  }

  componentDidMount() {
    console.log('ItemsList: componentDidMount');
    if (this.props.list === 'related') {
      this.getRelatedProducts(this.props.currentProductId);
    }
    // MOVE THIS TO CONSTRUCTOR - IF FIRES DIFFERENTLY ON APP RERENDER
    if (this.props.list === 'outfit') {
      this.getOutfit();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('ItemsList: componentDidUpdate, prevProps: ', prevProps);
    console.log('ItemsList: componentDidUpdate, current props: ', this.props);
    // console.log('ItemsList: componentDidUpdate, prevState: ', prevState);
    console.log('ItemsList: componentDidUpdate, current state: ', this.state);

    // ONLY NEED TO UPDATE RELATED PRODUCTS
    // if new props id is different than previous AND prevState equals current state
    if (this.props.list === 'related' && prevProps.currentProductId !== this.props.currentProductId &&
      JSON.stringify(prevState.products) === JSON.stringify(this.state.products)) {
      this.getRelatedProducts(this.props.currentProductId);
    }

  }

  getTitle () {
    if (this.props.list === 'related') {
      return 'Related Products';
    } else {
      return 'Your Outfit';
    }
  }

  // Rethink this - unnecessary empty method here
  getActionHandler() {
    if (this.props.list === 'related') {
      return this.compareProducts; // try passing null
    } else {
      return this.removeFromOutfit;
    }
  }

  // API calls
  getRelatedProducts(id) {
    console.log('ItemsList: call to retrieve related product data');
    $.get('/related', {'id': id }, (products) => {
      // Use refs if this causes unnecessary rendering or long execution time
      this.setState({ products, firstCard: 0 });
      console.log('ItemsList: Reset state with related products');
    });
  }

  getOutfit() {
    // get request to /outfit that parses cookie and gets info for all products
    $.get('/outfit', (products) => {
      if (products.length > 0) {
        this.setState({ products, firstCard: 0 });
      }
    });
  }

  // Click handler for special Outfit card
  addToOutfit() {
    if (!_.findWhere(this.state.products, {id: this.props.currentProductId})) {
      $.post('/outfit', { 'id': this.props.currentProductId.toString() }, (data) => {
        // Call getOutfit or reset state with current products (spread) plus current data (sort)
        this.getOutfit();
      });
    } else {
      console.log('Product already added to your outfit'); // ALERT
    }
  }

  // Action item click handlers
  compareProducts(id) {
    // Will bring up modal display
    console.log('Called action item handler for related products');
  }

  removeFromOutfit(id) {
    $.ajax({
      url: `/outfit?${id}`,
      type: 'DELETE',
      success: () => {
        let newOutfit = this.state.products.filter(product => {
          return product.id !== id;
        });
        this.setState({ products: newOutfit });
      }
    });
  }

  // Click handlers for carousel buttons
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

  render() {
    return (
      <div >
        <h4>{this.getTitle()}</h4>
        <div className = "carousel">
          {this.state.firstCard > 0 ? <button type="button" onClick={this.leftArrowClick.bind(this)} style={{backgroundColor: 'white', border: 'none'}}> Left </button> : ''}
          {this.props.list === 'outfit' ? <AddOutfitCard addToOutfit={this.addToOutfit.bind(this)}/> : ''}
          {this.state.products.slice(this.state.firstCard, this.state.firstCard + 3).map((product, i) => {
            return <ProductCard key={i} product={product} actionHandler={this.getActionHandler()} list={this.props.list} changeCurrentProduct={this.props.changeCurrentProduct}/>;
          })}
          {this.state.firstCard < this.state.products.length - 3 ? <button type="button" onClick={this.rightArrowClick.bind(this)} style={{backgroundColor: 'white', border: 'none'}}> Right </button> : ''}
        </div>
      </div>
    );
  }
}

export default ItemsList;