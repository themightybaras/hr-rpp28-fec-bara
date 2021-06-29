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

  expect(1 + 1).toEqual(2);
  let testCH = () => {};
  let testModalTrue = shallow(
    <RelatedModal modal={true} actionHandler={testCH} currentProductInfo={ExampleOutfit.withDefault} product={ExampleOutfit.withDefault}/>
  );
  let testModalFalse = shallow(
    <RelatedModal modal={false} actionHandler={testCH} currentProductInfo={ExampleOutfit.withDefault} product={ExampleOutfit.withDefault}/>
  );

  expect(testModalTrue.find('.modal-related').exists()).toBe(true);
  expect(testModalTrue.find('.display-block').exists()).toBe(true);
  expect(testModalTrue.find('display-none').exists()).toBe(false);

  expect(testModalFalse.find('.modal-related').exists()).toBe(true);
  expect(testModalFalse.find('.display-none').exists()).toBe(true);
  expect(testModalFalse.find('.modal-related display-block').exists()).toBe(false);
});
