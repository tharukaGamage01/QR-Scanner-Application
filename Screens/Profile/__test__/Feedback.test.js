import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import FeedbackPage from '../FeedbackPage';

describe('<FeedbackPage />', () => {
  it('allows the user to fill the form', () => {
    const { getByTestId } = render(<FeedbackPage />);
    
    // Simulate user selecting a radio button
    const radioButton = getByTestId('radio-opt1');
    fireEvent.press(radioButton);
    
    // Simulate user entering text into the comment field
    const commentField = getByTestId('comment-input');
    fireEvent.changeText(commentField, 'Great service!');
    
    // Check if the radio button and comment field values are updated
    expect(radioButton.props.checked).toBe(true);
    expect(commentField.props.value).toBe('Great service!');
  });

});
