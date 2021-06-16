import React from 'react';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});
import axios from 'axios';
import QuestionList from '../../client/src/components/questions/QuestionList.jsx';
import sampleData from './sampleData.js';

jest.mock('axios');

test('test question list block', () => {

  axios.get.mockResolvedValue({data: sampleData});

  const getSpy = jest.spyOn(axios, 'get');
  const questionListBlock = shallow(
    <QuestionList />
  );

  expect(getSpy).toBeCalled();

});

test('test question list block', () => {

  axios.get.mockResolvedValue({data: sampleData});

  const getSpy = jest.spyOn(axios, 'get');
  const questionListBlock = shallow(
    <QuestionList />
  );

  expect(getSpy).toBeCalled();
  expect(questionListBlock.find('#search-questions').exists()).toBe(true);
  expect(questionListBlock.find('.more-questions-button').text()).toBe('MORE QUESTIONS');
  expect(questionListBlock.find('.add-question-button').text()).toBe('ADD A QUESTION +');

});