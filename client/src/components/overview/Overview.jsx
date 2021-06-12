/* eslint-disable camelcase */
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import _ from 'underscore';
import Promise from 'bluebird';
import Gallery from './Gallery.jsx';
import Checkout from './Checkout.jsx';
import Description from './Description.jsx';

class Overview extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      expanded: false,
      products: [],
      styles: [],
      current: 0
    };
    $.get('/products', null, (products) => {
      return Promise.all(products)
        .then(products => {
          this.setState({ products: products });
        });
    })
      .then((products) => {
        var stylesArray = [];
        for (var i = 0; i < products.length; i++) {
          stylesArray.push($.get(`/products/${products[i].id}/styles`)
          );
        }
        Promise.all(stylesArray)
          .then((styles) => {
            this.setState({ styles: styles });
          });
      });
  }

  // componentDidMount() {
  //   $.get('/products', null, (products) => {
  //     return Promise.all(products)
  //       .then(products => {
  //         this.setState({ products: products });
  //       });
  //   })
  //     .then((products) => {
  //       var stylesArray = [];
  //       for (var i = 0; i < products.length; i++) {
  //         stylesArray.push($.get(`/products/${products[i].id}/styles`)
  //         );
  //       }
  //       Promise.all(stylesArray)
  //         .then((styles) => {
  //           this.setState({styles: styles});
  //         });
  //     });
  // }

  renderProducts(products, styles, index) {
    if (products.length > 0 & styles.length > 0) {
      return (
        <div>
          <img src={styles[index].results[0].photos[0].url}></img>
        </div>
      );
    }
  }


  render() {
    if (this.state.products.length > 0 && this.state.styles.length > 0) {
      return (
        <div id="container">
          <div id="carousel">
            <button>Back</button>
            <Gallery render={this.renderProducts} products={this.state.products} styles={this.state.styles} current={this.state.current} />
            <button>Forward</button>
          </div>
          <div id="product-info">
            {this.state.products[this.state.current].name}
            <br></br>
            {this.state.products[this.state.current].description}
            <div id="style-selector">
              Style selector
            </div>
            <div id="cart">
            </div>
            <div id="product-info">
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <span>Loading...</span>
      );
    }
  }
}

export default Overview;
