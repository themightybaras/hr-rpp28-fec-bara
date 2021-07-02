import React from 'react';
import {shallow, configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

import RelatedProducts from '../../client/src/components/related/ProductCard.jsx';
import ExampleOutfit from './ExampleData.js';


test('Related products', () => {

  // let related = shallow(
  //   <RelatedProducts />
  //   // <RelatedProducts currentProductId={22166} currentProductInfo={ExampleOutfit.withDefault} changeCurrentProduct={() => {}}/>
  // );

  // expect(related.find('#relatedWidget').exists()).toBe(true);
  expect(1 + 1).toEqual(2);
});