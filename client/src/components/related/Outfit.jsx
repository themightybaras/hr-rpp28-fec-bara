import React from 'react';
import $ from 'jquery';
import _ from 'underscore';
import ProductCard from './ProductCard.jsx';
import AddOutfitCard from './AddOutfitCard.jsx';

class Outfit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      firstCard: 0
    };
    this.getOutfit = this.getOutfit.bind(this);
    this.removeFromOutfit = this.removeFromOutfit.bind(this);
    this.addToOutfit = this.addToOutfit.bind(this);
    this.leftArrowClick = this.leftArrowClick.bind(this);
    this.rightArrowClick = this.rightArrowClick.bind(this);

    this.getOutfit();
  }

  getOutfit() {
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
        this.getOutfit();
      });
    } else {
      alert('Product already added to your outfit');
    }
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
    if (this.state.firstCard < this.state.products.length - 2) {
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
    let displayProducts = this.state.products.slice(this.state.firstCard, this.state.firstCard + 2);
    let currentProductInfo = this.props.currentProductInfo || {id: null};

    return (
      <div className='outfitSection'>
        <h4> Your Outfit </h4>
        <div className = "relatedCarousel">
          {this.state.firstCard > 0 ? <button type="button" onClick={this.leftArrowClick} style={{backgroundColor: 'white', border: 'none'}}> Left </button> : ''}
          <AddOutfitCard addToOutfit={this.addToOutfit}/>
          {displayProducts.map((product, i) => {
            return <ProductCard key={i} product={product} actionHandler={this.removeFromOutfit} list={'outfit'} changeCurrentProduct={this.props.changeCurrentProduct} currentProductInfo={currentProductInfo} />;
          })}
          {this.state.firstCard < this.state.products.length - 2 ? <button type="button" onClick={this.rightArrowClick} style={{backgroundColor: 'white', border: 'none'}}> Right </button> : ''}
        </div>
      </div>
    );
  }
}

export default Outfit;