import React from 'react';

class Checkout extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <label htmlFor="style">Style</label>
        <select name="style">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
        </select>
        <label htmlFor="size">Size</label>
        <select name="size">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
        </select>
        <label htmlFor="number">Number of items</label>
        <select name="number">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
        </select>
        <button type="submit" id="addtocart">Add to bag</button>
        <button name="favorite">Save as favorite</button>
      </div>
    );
  }
}

export default Checkout;
