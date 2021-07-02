import React from 'react';
import axios from 'axios';
import {shallow, configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

import Outfit from '../../client/src/components/related/Outfit.jsx';
import ExampleOutfit from './ExampleData.js';

jest.mock('axios');

test('Should make axios call to retrieve Outfit', () => {

  axios.get.mockResolvedValue({data: ExampleOutfit.withDefault});

  const getSpy = jest.spyOn(axios, 'get');
  const outfit = shallow(
    <Outfit currentProductId={22161} changeCurrentProduct={() => {}}/>
  );

  expect(getSpy).toBeCalled();

  expect(outfit.find('.outfitSection').exists()).toBe(true);
});

test('Shouldn\'t change firstCard if outfit has fewer than two products', () => {

  axios.get.mockResolvedValue({data: ExampleOutfit.withDefault});

  const getSpy = jest.spyOn(axios, 'get');
  const outfit = shallow(
    <Outfit currentProductId={22161} changeCurrentProduct={() => {}}/>
  );

  expect(getSpy).toBeCalled();
  let instance = outfit.instance();

  instance.rightArrowClick();
  // Need to mock cookie with  2 products for this to work
  // expect(outfit.state('firstCard')).toEqual(1);
  expect(outfit.state('firstCard')).toEqual(0);

  instance.leftArrowClick();
  expect(outfit.state('firstCard')).toEqual(0);

});