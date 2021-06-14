import React from 'react';
import _ from 'underscore';
import {ActionItem, Image, Category, Name, Price, Review} from './CardComponents.jsx';
import RelatedModal from './RelatedModal.jsx';

//const ProductCard = ({product, actionHandler, list}) => {
class ProductCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    this.actionHandler = this.actionHandler.bind(this);
  }
  // ! revise sale price

  // if (list === 'related') {
  //   actionHandler = setModal(!modal);
  // }

  actionHandler() {
    if (this.props.list === 'outfit') {
      this.props.actionHandler();
    }
  }

  render() {

    let originalPrice = this.props.product.default_price;
    let salePrice;
    if (this.props.product.id) {
      salePrice = this.props.product.results.sale_price;
    }

    return (
      <div>
        <div className="productcard">
          <ActionItem product={this.props.product} actionHandler={this.actionHandler}/>
          <br />
          <Image results={this.props.product.results}/>
          <br />
          <Category category={this.props.product.category}/>
          <br />
          <Name name={this.props.product.name}/>
          <br />
          <Price price={this.props.product.default_price}/>
          <br />
          <Review />
        </div>
        {/* <RelatedModal modal={this.state.modal} actionHandler={actionHandler}/> */}
      </div>
    );
  }
}

export default ProductCard;