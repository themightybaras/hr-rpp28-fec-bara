import React from 'react';
import Outfit from './Outfit.jsx';
import RelatedProducts from './RelatedProducts.jsx';


const RelatedOutfit = ({currentProductId, currentProductInfo, changeCurrentProduct}) => {
  return (
    <div id='relatedWidget'>
      <RelatedProducts currentProductId={currentProductId} currentProductInfo={currentProductInfo} changeCurrentProduct={changeCurrentProduct}/>
      <br></br>
      <Outfit currentProductId={currentProductId} changeCurrentProduct={changeCurrentProduct}/>
      <br></br>
    </div>
  );
};

export default RelatedOutfit;