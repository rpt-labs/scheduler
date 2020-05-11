
import React from 'react';
import { render, fireEvent, getByTestId } from '@testing-library/react';
import { RadioButtonList } from './RadioButtonList';

describe('RadioButtonList', () => {
  let defaultProps;

  beforeEach(() => {
    defaultProps = {
      cohorts : [
        {name: 'Test', isChecked: false }
      ],
      handleRadioButtonChange: jest.fn(),
      showDetails: jest.fn(),
      buttonLabel: "test label"
    };
  });

  it('should render the radioButtonList component', () => {
    const { queryByTestId } = render(<RadioButtonList {...defaultProps} />);
    expect(queryByTestId('radio-button-list')).not.toBeNull();
  });
});
