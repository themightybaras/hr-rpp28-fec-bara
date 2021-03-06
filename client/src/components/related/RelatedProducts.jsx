import React from 'react';
import axios from 'axios';
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
    this.leftArrowClick = this.leftArrowClick.bind(this);
    this.rightArrowClick = this.rightArrowClick.bind(this);

    this.getRelatedProducts(props.currentProductId);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currentProductId !== this.props.currentProductId && JSON.stringify(prevState.products) === JSON.stringify(this.state.products)) {
      this.getRelatedProducts(this.props.currentProductId);
    }
  }

  getRelatedProducts(id) {
    // $.get('/related', {'id': id }, (products) => {
    //   this.setState({ products, firstCard: 0 });
    // });
    return axios.get('/related', { params: {'id': id }})
      .then(results => {
        this.setState({ products: results.data, firstCard: 0 });
      })
      .catch(err => console.log(err));

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
    let currentProductInfo = this.props.currentProductInfo || {id: null};
    if (this.state.products.length === 0) {
      return (
        <div className='relatedSection'>
          Loading...
        </div>);
    }
    let displayProducts = this.state.products.slice(this.state.firstCard, this.state.firstCard + 3);
    return (
      <div className='relatedSection'>
        <h3 className='relatedHeader'>RELATED PRODUCTS</h3>
        <div className='relatedSectionFlex'>
          <div className = "relatedCarousel">
            <CarouselButtonLeft firstCard={this.state.firstCard} leftArrowClick={this.leftArrowClick}/>
            {displayProducts.map((product, i) => {
              return <ProductCard key={product.id} col={i + 2} product={product} list={'related'} changeCurrentProduct={this.props.changeCurrentProduct} currentProductInfo={currentProductInfo} icon={'star'}/>;
            })}
            <CarouselButtonRight firstCard={this.state.firstCard} outfitLength={this.state.products.length} max={3} rightArrowClick={this.rightArrowClick}/>
          </div>
        </div>
      </div>
    );
  }
}

export default RelatedProducts;