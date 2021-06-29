import React from 'react';
import $ from 'jquery';
import _ from 'underscore';
import ProductCard from './ProductCard.jsx';
import { CarouselButtonRight, CarouselButtonLeft } from './CarouselButton.jsx';

class RelatedProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      firstCard: 0
    };
    this.getRelatedProducts = this.getRelatedProducts.bind(this);
    this.getRelatedProducts(props.currentProductId);
    this.leftArrowClick = this.leftArrowClick.bind(this);
    this.rightArrowClick = this.rightArrowClick.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currentProductId !== this.props.currentProductId && JSON.stringify(prevState.products) === JSON.stringify(this.state.products)) {
      this.getRelatedProducts(this.props.currentProductId);
    }
  }

  getRelatedProducts(id) {
    $.get('/related', {'id': id }, (products) => {
      console.log(products);
      this.setState({ products, firstCard: 0 });
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
    let displayProducts = this.state.products.slice(this.state.firstCard, this.state.firstCard + 3);
    let currentProductInfo = this.props.currentProductInfo || {id: null};
    return (
      <div className='relatedSection'>
        <h4 className='relatedHeader'>Related Products</h4>
        <div className='relatedSectionFlex'>
          <div className = "relatedCarousel">
            <CarouselButtonLeft firstCard={this.state.firstCard} leftArrowClick={this.leftArrowClick}/>
            {displayProducts.map((product, i) => {
              return <ProductCard key={i} col={i + 2} product={product} list={'related'} changeCurrentProduct={this.props.changeCurrentProduct} currentProductInfo={currentProductInfo} icon={'star'}/>;
            })}
            <CarouselButtonRight firstCard={this.state.firstCard} outfitLength={this.state.products.length} max={3} rightArrowClick={this.rightArrowClick}/>
          </div>
        </div>
      </div>
    );
  }
}

export default RelatedProducts;