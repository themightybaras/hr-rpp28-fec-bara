import React from 'react';
import {shallow, configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

import RelatedOutfit from '../../client/src/components/related/RelatedOutfit.jsx';
import ExampleOutfit from './ExampleData.js';

test('App should render separate related products and outfit sections', () => {

  let ro = shallow(
    <RelatedOutfit currentProductId={22161} currentProductInfo={ExampleOutfit.withDefault} changeCurrentProduct={() => {}}/>
  );

  expect(ro.find('#relatedWidget').exists()).toBe(true);
});