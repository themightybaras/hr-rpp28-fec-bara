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
  // Output: one array of combined feature objects, with boolean values for each product for each feature
  // Constraints: Output should be unique by feature
  // Edge cases: No features property on product object, empty features array

  let exampleFeatures = [
    { feature: 'Loose Cut', current: true, compared: true },
    { feature: 'Skinny Cut', current: true, compared: false },
    { feature: 'Lifetime Guarantee', current: true, compared: true },
    // { feature: 'Lifetime Guarantee', current: true, compared: true },
    // { feature: 'Lifetime Guarantee', current: true, compared: true },
    // { feature: 'Lifetime Guarantee', current: true, compared: true },
    // { feature: 'Lifetime Guarantee', current: true, compared: true },
    // { feature: 'Lifetime Guarantee', current: true, compared: true },
    // { feature: 'Lifetime Guarantee', current: true, compared: true },
    // { feature: 'Lifetime Guarantee', current: true, compared: true },
    // { feature: 'Lifetime Guarantee', current: true, compared: true },
    // { feature: 'Lifetime Guarantee', current: true, compared: true },
    // { feature: 'Lifetime Guarantee', current: true, compared: true },
    // { feature: 'Lifetime Guarantee', current: true, compared: true },
    // { feature: 'Lifetime Guarantee', current: true, compared: true },
    // { feature: 'Lifetime Guarantee', current: true, compared: true },
    // { feature: 'Lifetime Guarantee', current: true, compared: true },
    // { feature: 'Lifetime Guarantee', current: true, compared: true },
    // { feature: 'Lifetime Guarantee', current: true, compared: true },
    // { feature: 'Lifetime Guarantee', current: true, compared: true },
    // { feature: 'Lifetime Guarantee', current: true, compared: true },
    // { feature: 'Lifetime Guarantee', current: true, compared: true },
    // { feature: 'Lifetime Guarantee', current: true, compared: true },
    { feature: 'Lifetime Guarantee', current: true, compared: true }
  ];
  const getCombinedFeatures = (current, compared) => {

    // set current, compared variables equal to input arrays or empty array

    // for each unique array of objects, loop through
    //  for each feature object
    //    define new property with key equal to the name of the array and value = true
    //    if value is a text value
    //      replace feature as value + feature
    //    delete value property

    // Define output array as a copy of the current array

    // Loop through the compared array. for each...
    //  Define holding variable for current loop feature name of compared element
    //  Define boolean for whether or not compared value was added to output (extended), set to false
    //  Loop through output array (length or output array and !boolean)
    //    If current output array element feature equals holding variable
    //      Decorate output feature object with compared feature object
    //      Set boolean to true
    //  If boolean false
    //    push compared feature object to output array

    // return combined array
  };

  // Define new variable to store result of calling getCombinedFeatures
  // console.log(' Compared Product features: ', product.features);
  // console.log('Current Product features: ', currentProductInfo.features);
  return (
    <div className = {modal ? 'modal-related display-block' : 'modal-related display-none'}>
      <div className='modalButtonWrapper'>
        <button className='modalCloseButton' onClick={actionHandler}> Close </button>
      </div>
      <div className='relatedModalComparison'>
        <div className='relatedModalHeader'>
          <div className='relatedCol1'> {currentProductInfo.name} </div>
          <div className='relatedCol2'> Characteristic </div>
          <div className='relatedCol3'> {product.name} </div>
        </div>
        {exampleFeatures.map((featureObj, i) => {
          return (
            <div className='relatedModalFeature' key = {i}>
              <div className='relatedCol1'> {featureObj.current ? <GrCheckmark /> : ''}</div>
              <div className='relatedCol2'> {featureObj.feature} </div>
              <div className='relatedCol3'> {featureObj.compared ? <GrCheckmark /> : ''} </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RelatedModal;