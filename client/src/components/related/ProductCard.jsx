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
    this.toggleModal = this.toggleModal.bind(this);
    this.changeCurrentProduct = this.changeCurrentProduct.bind(this);
    this.clickHandler = this.props.list === 'outfit' ? this.props.actionHandler : this.toggleModal;
    //this.actionHandler = this.actionHandler.bind(this);
  }
  // ! revise sale price

  // if (list === 'related') {
  //   actionHandler = setModal(!modal);
  // }

  toggleModal() {
    this.setState((state) => {
      return { modal: !state.modal };
    });
  }

  changeCurrentProduct() {
    this.props.changeCurrentProduct(this.props.product.id);
  }

  render() {

    let originalPrice = this.props.product.default_price;
    let salePrice;
    if (this.props.product.id) {
      salePrice = this.props.product.results.sale_price;
    }

    return (
      <div>
        <div className="productcard" >
          <ActionItem product={this.props.product} actionHandler={this.clickHandler}/>
          <br />
          <div onClick={this.changeCurrentProduct}>
            <Image results={this.props.product.results} />
          </div>
          <div onClick={this.changeCurrentProduct}>
            <Category category={this.props.product.category} />
          </div>
          <div onClick={this.changeCurrentProduct}>
            <Name name={this.props.product.name} />
          </div>
          <div onClick={this.changeCurrentProduct}>
            <Price price={this.props.product.default_price} />
          </div>
          <div onClick={this.changeCurrentProduct}>
            <Review />
          </div>
        </div>
        <RelatedModal modal={this.state.modal} actionHandler={this.clickHandler} currentProductInfo={this.props.currentProductInfo}/>
      </div>
    );
  }
}

export default ProductCard;