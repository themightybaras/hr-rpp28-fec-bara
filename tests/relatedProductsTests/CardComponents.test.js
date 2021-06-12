import React from 'react';
import {shallow, configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

import RelatedOutfit from '../../client/src/components/related/RelatedOutfit.jsx';
import ProductCard from '../../client/src/components/related/ProductCard.jsx';
import ItemsList from '../../client/src/components/related/ItemsList.jsx';
import {ActionItem, Image, Category, Name, Price, Review} from '../../client/src/components/related/CardComponents.jsx';

test('Simple text components render text passed as a prop', () => {
  let testText = 'Test';
  let testCategory = shallow(
    <Category category={testText}/>
  );
  let testName = shallow(
    <Name name={testText}/>
  );
  expect(testCategory.text()).toEqual(testText);
  expect(testName.text()).toEqual(testText);
});

// Test image
//    renders image for default product when there is one
//    renders first image of first product
//    renders placeholder image

// Test strikethrough for price
