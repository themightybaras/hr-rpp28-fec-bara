import React from 'react';
import _ from 'underscore';
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

  var getCombinedFeatures = (currentFeatures, comparedFeatures) => {

    var currentUnique = _.uniq(currentFeatures) || [];
    var comparedUnique = _.uniq(comparedFeatures) || [];

    console.log('unique? ', currentUnique, comparedUnique);

    var currentWorking = [];
    var comparedWorking = [];

    currentUnique.forEach(featObj => {
      let inWorking = false;
      let i = 0;
      while (i < currentWorking.length && !inWorking) {
        if (JSON.stringify(currentWorking[i]) === JSON.stringify(featObj)) {
          inWorking = true;
        }
        i++;
      }
      if (!inWorking) {
        currentWorking.push(_.clone(featObj));
      }
    });

    comparedUnique.forEach(featObj => {
      comparedWorking.push(_.clone(featObj));
    });

    const standardizeFeatures = (arr, arrKey) => {

      return arr.map(featureObj => {
        featureObj[arrKey] = true;
        //    if value is a text value
        if (typeof(featureObj.value) === 'string') {
          //      replace feature as value + feature
          featureObj.feature = featureObj.feature + ': ' + featureObj.value;
        }
        //    delete value property
        delete featureObj.value;
        return featureObj;
      });

    };

    let currentStandard = standardizeFeatures(currentWorking, 'current');
    let comparedStandard = standardizeFeatures(comparedWorking, 'compared');

    // Define output array as a copy of the current array
    let combined = currentStandard.slice();

    // Loop through the compared array. for each...
    for (var i = 0; i < comparedStandard.length; i++) {
      //  Define holding variable for current loop feature name of compared element
      let comparedElement = comparedStandard[i];
      //  Define boolean for whether or not compared value was added to output (extended), set to false
      let added = false;
      //  Loop through output array (length or output array and !boolean)
      let j = 0;
      while (j < combined.length && !added) {
        //    If current output array element feature equals holding variable
        if (combined[j].feature === comparedElement.feature) {
          //      Decorate output feature object with compared feature object
          _.extend(combined[j], comparedElement);
          //      Set boolean to true
          added = true;
        }
        j++;
      }
      //  If boolean false
      if (!added) {
        //    push compared feature object to output array
        combined.push(comparedElement);
      }
    }
    // return combined array
    return combined;
  };

  let combinedFeatures = getCombinedFeatures(currentProductInfo.features, product.features);

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
        {combinedFeatures.map((featureObj, i) => {
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