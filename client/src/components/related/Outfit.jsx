import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import _ from 'underscore';
import ProductCard from './ProductCard.jsx';
import AddOutfitCard from './AddOutfitCard.jsx';
import { CarouselButtonRight, CarouselButtonLeft } from './CarouselButton.jsx';

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
    return axios.get('/outfit')
      .then((results) => {
        if (results.data.length > 0) {
          this.setState({ products: results.data, firstCard: 0 });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  // Click handler for special Outfit card
  addToOutfit() {
    if (!_.findWhere(this.state.products, {id: this.props.currentProductId})) {
      return axios.post('/outfit', { 'id': this.props.currentProductId.toString() }).then(() => {
        this.getOutfit();
      }).catch(err => {
        console.log(err);
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

        this.setState(state => (
          { products: newOutfit, firstCard: state.firstCard > 0 ? state.firstCard - 1 : 0 }
        ));
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
        <h3 className={'outfitHeader'}> YOUR OUTFIT </h3>
        <div className='relatedSectionFlex'>
          <div className = "relatedCarousel">
            <CarouselButtonLeft firstCard={this.state.firstCard} leftArrowClick={this.leftArrowClick}/>
            <AddOutfitCard addToOutfit={this.addToOutfit}/>
            {displayProducts.map((product, i) => {
              return <ProductCard key={i} col={i + 3} product={product} actionHandler={this.removeFromOutfit} list={'outfit'} changeCurrentProduct={this.props.changeCurrentProduct} currentProductInfo={currentProductInfo} icon={'remove'} />;
            })}
            <CarouselButtonRight firstCard={this.state.firstCard} outfitLength={this.state.products.length} max={2} rightArrowClick={this.rightArrowClick}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Outfit;