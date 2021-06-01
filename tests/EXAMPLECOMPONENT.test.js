import React from 'react';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});
import ExampleComponent from '../client/src/ExampleTestComponent.jsx';

test('ExampleComponent renders correct text', ()=>{
  const exampleComponent = shallow(
    <ExampleComponent/>
  );
  expect(exampleComponent.text()).toEqual('THIS IS SARA TESTING JEST');
});