/* eslint-disable camelcase */
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Gallery from './Gallery.jsx';
import Checkout from './Checkout.jsx';
import Description from './Description.jsx';
import StarRating from '../review/StarRating.jsx';

class Overview extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      expanded: false,
      products: []
    };
    this.renderProducts.bind(this);
  }

  componentDidMount() {
    $.get('/products', null, (data) => {
      this.setState({products: data});
    });
  }

  renderProducts(collection) {
    var index = 0;
    if (collection) {
      return collection.map(product => {
        return <div key={product.name}>
          <img src={product.photos[0].thumbnail_url}></img>
          <br></br>
          <b>{product.name}</b>
          <br></br>
          <StarRating/>
          <br></br>
          {product.description}</div>;
      });
    }
  }

  render() {
    return (
      <div id="container">
        <div id="carousel">
          <Gallery render={this.renderProducts} products={this.state.products}/>

        </div>
        <div id="product-info">
          Rating and category
          <form>
            <div id="style-selector">
              Style selector
            </div>
            <div id="cart">

            </div>
          </form>
          <div id="product-info">
            <Description/>
            <div>Details</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Overview;
