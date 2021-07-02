import React from 'react';
import _ from 'underscore';
import axios from 'axios';
import ClickTracker from '../../ClickTracker.jsx';
//import ExampleOutfit from './ExampleData.js';

const RelatedModal = ({modal, product, actionHandler, currentProductInfo}) => {

  var getCombinedFeatures = (currentFeatures, comparedFeatures) => {

    var currentFeatures = currentFeatures || [];
    var comparedFeatures = comparedFeatures || [];

    var currentWorking = [];
    var comparedWorking = [];

    currentFeatures.forEach(featObj => {
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

    comparedFeatures.forEach(featObj => {
      let inWorking = false;
      let i = 0;
      while (i < comparedWorking.length && !inWorking) {
        if (JSON.stringify(comparedWorking[i]) === JSON.stringify(featObj)) {
          inWorking = true;
        }
        i++;
      }
      if (!inWorking) {
        comparedWorking.push(_.clone(featObj));
      }
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

    let combined = currentStandard.slice();

    for (var i = 0; i < comparedStandard.length; i++) {
      let comparedElement = comparedStandard[i];
      let added = false;
      let j = 0;
      while (j < combined.length && !added) {
        if (combined[j].feature === comparedElement.feature) {
          _.extend(combined[j], comparedElement);
          added = true;
        }
        j++;
      }
      if (!added) {
        combined.push(comparedElement);
      }
    }
    return combined;
  };

  let combinedFeatures = getCombinedFeatures(currentProductInfo.features, product.features);

  return (
    <div className = {modal ? 'modal-related display-block' : 'modal-related display-none'}>
      <ClickTracker>
        <div className='modalButtonWrapper' widget='related products' type='button'>
          <button className='modalCloseButton' onClick={actionHandler}> &times; </button>
        </div>
      </ClickTracker>
      <div className='relatedModalComparison'>
        <div className='relatedModalHeader'>
          <div className='relatedModalCol1'> <strong> {currentProductInfo.name} </strong> </div>
          <div className='relatedModalCol2'> <strong> Characteristic </strong> </div>
          <div className='relatedModalCol3'> <strong> {product.name} </strong> </div>
        </div>
        <br></br>
        {combinedFeatures.map((featureObj, i) => {
          return (
            <div className='relatedModalFeature' key = {i}>
              <div className='relatedModalCol1'> {featureObj.current ? '✓' : ''} </div>
              <div className='relatedModalCol2'> {featureObj.feature} </div>
              <div className='relatedModalCol3'> {featureObj.compared ? '✓' : ''} </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RelatedModal;