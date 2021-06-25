import React from 'react';
import Outfit from './Outfit.jsx';
import RelatedProducts from './RelatedProducts.jsx';


const RelatedOutfit = ({currentProductId, currentProductInfo, changeCurrentProduct}) => {
  return (
    <div id='relatedWidget'>
      <RelatedProducts currentProductId={currentProductId} currentProductInfo={currentProductInfo} changeCurrentProduct={changeCurrentProduct}/>
      <Outfit currentProductId={currentProductId} changeCurrentProduct={changeCurrentProduct}/>
    </div>
  );
};

export default RelatedOutfit;