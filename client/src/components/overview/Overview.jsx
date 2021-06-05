import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Gallery from './Gallery.jsx';

class Overview extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }
  apiCall(type, endpoint) {
    $.ajax({
      type: type,
      url: endpoint,
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
          <Gallery/>
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
            <div>Description here</div>
            <div>Details</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Overview;