import React from 'react';
import {shallow, configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

import ProductCard from '../../client/src/components/related/ProductCard.jsx';
import ExampleOutfit from './ExampleData.js';

test('Product card', () => {

  let testRelatedProduct = shallow(
    <ProductCard key={1} product={ExampleOutfit.withDefault} actionHandler={() => {}} list={'related'} changeCurrentProduct={() => {}}/>
  );

  expect(testRelatedProduct.find('.productcard').exists()).toBe(true);
});


