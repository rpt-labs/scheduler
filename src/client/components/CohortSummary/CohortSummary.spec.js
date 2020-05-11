
import React from 'react';
import { render, fireEvent, getByTestId } from '@testing-library/react';
import CohortSummary from './CohortSummary';

describe('cohortSummary', () => {
  let defaultProps;

  beforeEach(() => {
    defaultProps = {
    };
  });

  it('should render the cohortSummary component', () => {
    const { queryByTestId } = render(<CohortSummary {...defaultProps} />);
    expect(queryByTestId('cohort-summary')).not.toBeNull();
  });
});
