import React from 'react';
import {shallow, configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

import ExampleOutfit from './ExampleData.js';
import RelatedModal from '../../client/src/components/related/RelatedModal.jsx';

// test if props modal is true
// test if props modal is false
// Has button to close modal
// Check rendering of other things (maybe only props.children)

test('Related products modal display', () => {

  let testCH = () => {};
  let testModalTrue = shallow(
    <RelatedModal modal={true} actionHandler={testCH} currentProductInfo={ExampleOutfit.withDefault} product={ExampleOutfit.noDefault}/>
  );
  let testModalFalse = shallow(
    <RelatedModal modal={false} actionHandler={testCH} currentProductInfo={ExampleOutfit.noDefault} product={ExampleOutfit.withDefault}/>
  );

  expect(testModalTrue.find('.modal-related').exists()).toBe(true);
  expect(testModalTrue.find('.display-block').exists()).toBe(true);
  expect(testModalTrue.find('display-none').exists()).toBe(false);

  expect(testModalFalse.find('.modal-related').exists()).toBe(true);
  expect(testModalFalse.find('.display-none').exists()).toBe(true);
  expect(testModalFalse.find('.display-block').exists()).toBe(false);
});

test('Modal should work even if one product object has no features', () => {

  let testCH = () => {};
  let testModalCompared = shallow(
    <RelatedModal modal={true} actionHandler={testCH} currentProductInfo={ExampleOutfit.withDefault} product={ExampleOutfit.noImage}/>
  );
  let testModalCurrent = shallow(
    <RelatedModal modal={true} actionHandler={testCH} currentProductInfo={ExampleOutfit.noImage} product={ExampleOutfit.withDefault}/>
  );

  expect(testModalCompared.find('.modal-related').exists()).toBe(true);
  expect(testModalCompared.find('.display-block').exists()).toBe(true);
  expect(testModalCompared.find('display-none').exists()).toBe(false);

  expect(testModalCurrent.find('.modal-related').exists()).toBe(true);
  expect(testModalCurrent.find('.display-block').exists()).toBe(true);
  expect(testModalCurrent.find('display-none').exists()).toBe(false);

});
