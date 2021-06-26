import React from 'react';
import { GrCheckmark } from 'react-icons/gr';
//import ExampleOutfit from './ExampleData.js';


// Does it make sense to use React.children for the modal?
//    Not sure what's going to be in each one -> could specify that elsewhere and pass as children props

// start with simple modal, see if interaction and display work

// User clicks action item in product card (needs to have toggler passed)
// Click handler sets modal state to true
// Modal display shown
// Modal display clicked
//  Click handler sets modal state to false
// Modal disappears

const RelatedModal = ({modal, product, actionHandler, currentProductInfo}) => {

  // construct features rows
  //   Will contain shared or unique feature
  //  Construct array or new feature objects with feature, current, compare
  //    If feature array for that product
  //    get unique features
  //    If value is text
  //        characteristic is value + features
  //    Else
  //      char is just feature
  // Current     Char          Compared
  //   √      GMO-free           √
  //         5 year warranty     √
  //   √     Straight Cut
  //   √      Skinny Cut         √

  // Input: two arrays of feature objects
  // Output: one array of
  const getCombinedFeatures = (product1, product2) => {

  };

  // Use grid for spacing/styling
  console.log(' Compared Product features: ', product.features);
  console.log('Current Product features: ', currentProductInfo.features);
  return (
    <div className = {modal ? 'modal-related display-block' : 'modal-related display-none'}>
      <div className='modalButtonWrapper'>
        <button className='modalCloseButton' onClick={actionHandler}> Close </button>
      </div>
      <div className='relatedModalComparison'>
        <div className='relatedModalHeader'>
          {currentProductInfo.name}
          Characteristic
          {product.name}
        </div>
        <div className='relatedModalFeature'>
          <GrCheckmark />
          Feature1
          <GrCheckmark />
        </div>
        <div className='relatedModalFeature'>
          {/* <GrCheckmark /> */}
          Feature2
          <GrCheckmark />
        </div>
        <div className='relatedModalFeature'>
          <GrCheckmark />
          Feature3
          {/* <GrCheckmark /> */}
        </div>
      </div>
    </div>
  );
};

export default RelatedModal;