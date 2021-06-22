import React from 'react';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});
import AddQuestionOrAnswer from '../../client/src/components/questions/AddQuestionOrAnswer.jsx';

test('test add question or answer block', () => {

  const questionSample = {
    'question_id': 153695,
    'question_body': 'Why is this product cheaper here than other sites?',
    'question_date': '2018-10-18T00:00:00.000Z',
    'asker_name': 'willsmith',
    'question_helpfulness': 4,
    reported: false,
    answers: {
      1444586: {
        id: 1444586,
        body: 'We are selling it here without any markup from the middleman!',
        date: '2018-08-18T00:00:00.000Z',
        'answerer_name': 'Seller',
        helpfulness: 4,
        photos: []
      }
    }
  };

  const addQuestionBlockNoModal = shallow(
    <AddQuestionOrAnswer addModalOpen={false} toggleAddModal={() => {}} isQuestionModal={true} />
  );

  const addQuestionBlock = shallow(
    <AddQuestionOrAnswer addModalOpen={true} toggleAddModal={() => {}} isQuestionModal={true} />
  );

  const addAnswerBlock = shallow(
    <AddQuestionOrAnswer question={questionSample} addModalOpen={true} toggleAddModal={() => {}} isQuestionModal={false} />
  );

  expect(addQuestionBlockNoModal.find('.display-none').exists()).toBe(true);
  expect(addQuestionBlock.find('.add-your-question-or-answer-label').text()).toBe('Your Question*');
  expect(addQuestionBlock.find('.add-your-nickname-label').text()).toBe('What is Your Nickname*');
  expect(addQuestionBlock.find('.add-your-email-label').text()).toBe('Your Email*');
  expect(addQuestionBlock.find('.add-question-or-answer-submit').text()).toBe('Submit Question');
  expect(addAnswerBlock.find('.add-your-question-or-answer-label').text()).toBe('Your Answer*');
  expect(addAnswerBlock.find('.add-your-nickname-label').text()).toBe('What is Your Nickname*');
  expect(addAnswerBlock.find('.add-your-email-label').text()).toBe('Your Email*');
  expect(addAnswerBlock.find('.add-question-or-answer-submit').text()).toBe('Submit Answer');

});