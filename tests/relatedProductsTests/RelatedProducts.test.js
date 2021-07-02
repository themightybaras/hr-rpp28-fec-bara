import React from 'react';
import axios from 'axios';
import {shallow, configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

import RelatedProducts from '../../client/src/components/related/RelatedProducts.jsx';
import ExampleOutfit from './ExampleData.js';

jest.mock('axios');

test('Related products', () => {

  axios.get.mockResolvedValue({data: ExampleOutfit.withDefault});

  const getSpy = jest.spyOn(axios, 'get');
  const related = shallow(
    // <RelatedProducts />
    <RelatedProducts currentProductId={22161} currentProductInfo={ExampleOutfit.withDefault} changeCurrentProduct={() => {}}/>
  );

  expect(getSpy).toBeCalled();
  expect(related.find('.relatedSection').exists()).toBe(true);
  // done();
  // expect(1 + 1).toEqual(2);
});