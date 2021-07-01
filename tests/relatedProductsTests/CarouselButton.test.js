import React from 'react';
import {shallow, configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

import { CarouselButtonLeft, CarouselButtonRight } from '../../client/src/components/related/CarouselButton.jsx';


test('Should render left carousel button when carousel has been shifted right', () => {

  let leftButton = shallow(
    <CarouselButtonLeft firstCard={1} leftArrowClick={()=>{}}/>
  );
  let noButton = shallow(
    <CarouselButtonLeft firstCard={0} leftArrowClick={()=>{}}/>
  );

  expect(leftButton.find('.other').exists()).toBe(true);
  expect(noButton.find('.other').exists()).toBe(false);
});

test('Should render right carousel button when there are additional products to display', () => {

  let rightButton = shallow(
    <CarouselButtonRight firstCard={0} rightArrowClick={()=>{}} max={3} outfitLength={10}/>
  );
  let noButton = shallow(
    <CarouselButtonRight firstCard={0} rightArrowClick={()=>{}} max={3} outfitLength={2}/>
  );

  expect(rightButton.find('.other').exists()).toBe(true);
  expect(noButton.find('.other').exists()).toBe(false);
});