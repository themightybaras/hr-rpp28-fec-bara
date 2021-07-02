import React from 'react';
import axios from 'axios';
import {shallow, configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

import Outfit from '../../client/src/components/related/Outfit.jsx';
import ExampleOutfit from './ExampleData.js';

jest.mock('axios');

test('Outfit', () => {

  axios.get.mockResolvedValue({data: ExampleOutfit.withDefault});

  const getSpy = jest.spyOn(axios, 'get');
  const related = shallow(
    // <RelatedProducts />
    <Outfit currentProductId={22161} changeCurrentProduct={() => {}}/>
  );

  expect(getSpy).toBeCalled();
  expect(related.find('.outfitSection').exists()).toBe(true);
  // done();
  // expect(1 + 1).toEqual(2);
});