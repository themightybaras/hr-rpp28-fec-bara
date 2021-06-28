import React from 'react';
import _ from 'underscore';
import {ActionItem, Image, Price, Review} from './CardComponents.jsx';
import RelatedModal from './RelatedModal.jsx';

class ProductCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.changeCurrentProduct = this.changeCurrentProduct.bind(this);
    this.clickHandler = this.props.list === 'outfit' ? this.props.actionHandler : this.toggleModal;
  }

  toggleModal() {
    this.setState((state) => {
      return { modal: !state.modal };
    });
  }

  changeCurrentProduct() {
    this.props.changeCurrentProduct(this.props.product.id);
    scroll(0, 0);
  }

  render() {

    let originalPrice = this.props.product.default_price;
    let salePrice;
    if (this.props.product.id) {
      salePrice = this.props.product.results.sale_price;
    }

    return (
      <div className={`productcard cardcol${this.props.col}`} >
        <div className='productImageItem'>
          <ActionItem product={this.props.product} actionHandler={this.clickHandler} icon={this.props.icon}/>
          <Image product={this.props.product} clickHandler={this.changeCurrentProduct}/>
        </div>
        <div className="productInfo" onClick={this.changeCurrentProduct}>
          <p className="productCategory"> {this.props.product.category} </p>
          <p className="productName"> <strong>{this.props.product.name}</strong></p>
          <Price product={this.props.product}/>
          <Review />
        </div>
        <RelatedModal modal={this.state.modal} actionHandler={this.clickHandler} currentProductInfo={this.props.currentProductInfo} product={this.props.product}/>
      </div>
    );
  }
}

export default ProductCard;