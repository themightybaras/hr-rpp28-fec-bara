import React from 'react';
import {shallow, configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

import ExampleOutfit from './ExampleData.js';

test('Simple test', () => {
  expect(1 + 1).toEqual(2);
});

// Make sure removing an item from the outfit doesn't remove any others
