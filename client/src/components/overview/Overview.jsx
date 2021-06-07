import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Gallery from './Gallery.jsx';
import Checkout from './Checkout.jsx';
import Description from './Description.jsx';
class Overview extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      expanded: false,
    };
    console.log(props);
  }
  getProducts() {
    $.ajax({
      type: 'get',
      url: '/products',
      success: function(data) {
        console.log(data);
      },
      error: function(error) {
        console.log('Error!', error);
      }
    });
  }

  render() {
    return (
      <div id="container">
        <div id="carousel">
          Image carousel
          <Gallery apiCall={this.apiCall}/>
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