import React, { useState, useEffect } from 'react';
import './styles.scss';
import { AiOutlineStar } from 'react-icons/ai';

const AddToCart = ({ currentStyle }) => {
  let skus = currentStyle.skus;
  let newSkusObj = {};
  for (var key in skus) {
    if (!newSkusObj[skus[key]['size']]) {
      newSkusObj[skus[key]['size']] = skus[key]['quantity'];
    } else {
      newSkusObj[skus[key]['size']] += skus[key]['quantity'];
    }
  }
  let skusArr = Object.entries(newSkusObj);
  const [quantity, setQuantity] = useState('');

  useEffect(() => {
    setQuantity('');
  }, [currentStyle.style_id]);

  let quantityList = [];
  var maxQuantity = quantity > 15 ? 15 : quantity;
  for (var i = 1; i <= maxQuantity; i++) {
    quantityList.push(<option key={i}>{i}</option>);
  }

  return (
    <div className="add-to-cart">
      <div className="select-size">
        <select
          value={quantity}
          className="select-size-box"
          onChange={(e) => {
            setQuantity(e.target.value);
          }}
        >
          <option value="">SELECT SIZE</option>
          {!skusArr.length ? (
            <option>OUT OF STOCK</option>
          ) : (
            skusArr.map((sku, i) => {
              return (
                <option key={i} value={sku[1]}>
                  {sku[0]}
                </option>
              );
            })
          )}
        </select>

        <select className="quantity-box">
          {quantity === '' ? <option>-</option> : quantityList}
        </select>
      </div>

      <div className="add-to-bag">
        <button className="add-to-bag-box">
          ADD TO BAG
          <span id="add-icon"></span>
        </button>
        <button className="add-to-favorites">
          <AiOutlineStar />
        </button>
      </div>
    </div>
  );
};

export default AddToCart;
