import React from 'react';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});
import AddQuestionOrAnswer from '../../client/src/components/questions/AddQuestionOrAnswer.jsx';

test('test add question or answer block', () => {

  const addQuestionBlockNoModal = shallow(
    <AddQuestionOrAnswer addModalOpen={false} toggleAddModal={() => {}} isQuestionModal={true} />
  );

  const addQuestionBlock = shallow(
    <AddQuestionOrAnswer addModalOpen={true} toggleAddModal={() => {}} isQuestionModal={true} />
  );

  const addAnswerBlock = shallow(
    <AddQuestionOrAnswer addModalOpen={true} toggleAddModal={() => {}} isQuestionModal={false} />
  );

  expect(addQuestionBlockNoModal.find('.modal display-none').exists()).toBe(true);
  expect(addQuestionBlock.find('.add-your-question-or-answer-label').text()).toBe('Your Question');
  expect(addQuestionBlock.find('.add-your-nickname-label').text()).toBe('What is Your Nickname');
  expect(addQuestionBlock.find('.add-your-email-label').text()).toBe('Your Email');
  expect(addQuestionBlock.find('.add-question-or-answer-submit').text()).toBe('Submit Question');
  expect(addAnswerBlock.find('.add-your-question-or-answer-label').text()).toBe('Your Answer');
  expect(addAnswerBlock.find('.add-your-nickname-label').text()).toBe('What is Your Nickname');
  expect(addAnswerBlock.find('.add-your-email-label').text()).toBe('Your Email');
  expect(addAnswerBlock.find('.add-question-or-answer-submit').text()).toBe('Submit Answer');

});