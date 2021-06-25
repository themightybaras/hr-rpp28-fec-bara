import React from 'react';
import {shallow, configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

import AddOutfitCard from '../../client/src/components/related/AddOutfitCard.jsx';

test('Card to add current product to outfit', () => {

  let testAddOutfit = shallow(
    <AddOutfitCard addToOutfit={() => {}} />
  );

  expect(testAddOutfit.find('.productcard').exists()).toBe(true);
  expect(testAddOutfit.find('.addoutfit').exists()).toBe(true);
});