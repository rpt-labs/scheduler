
import React from 'react';
import { render, fireEvent, getByTestId } from '@testing-library/react';
import RadioButton from './RadioButton';

describe('RadioButton', () => {
  let defaultProps;

  beforeEach(() => {
    defaultProps = {
      cohort: {name: 'Test', checked: false},
      handleRadioButtonChange: jest.fn()
    };
  });

  it('should render the radioButton component', () => {
    const { queryByTestId } = render(<RadioButton {...defaultProps} />);
    expect(queryByTestId('radio-button')).not.toBeNull();
  });

  // it('should handle button change when the button is clicked', () => {
  //   const { getByTestId } = render(<RadioButton {...defaultProps} />);
  //   const button = getByTestId('radio-button')
  //   fireEvent.onClick(button)
  //   expect(defaultProps.handleRadioButtonChange).toHaveBeenCalled();
  // });
});
