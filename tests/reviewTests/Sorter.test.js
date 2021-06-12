import React from 'react';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

import SortingForm from '../../client/src/components/review/sorter.jsx';

test('should display total number of reviews for product', ()=>{
  const sorter = shallow(<SortingForm sortValue = {'relevant'} numberOfReviews = {100}/>);
  const label = sorter.find('label');
  expect(label.text()).toEqual('100 reviews, sorted by');
});

// test('should rerender reviews when sorting style changed', ()=>{

// });