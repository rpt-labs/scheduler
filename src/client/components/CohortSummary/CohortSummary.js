import React from 'react';
import PropTypes from 'prop-types';
import { RadioButtonList } from '../shared/RadioButtonList/RadioButtonList'

const cohorts = [
  {name: 'RPT18', isChecked: false },
  {name: 'RPT19', isChecked: false },
  {name: 'RPT20', isChecked: false }
];
export default class CohortSummary extends React.Component {
  handleRadioButtonChange () {
    console.log('handleRadioButtonChange');
  }

  render() {
    return (
      <div data-testid="cohort-summary">
        <RadioButtonList
          cohorts={cohorts}
          handleRadioButtonChange={this.handleRadioButtonChange}
          showDetails={this.handleRadioButtonChange}
          buttonLabel="Show Summary"
        />
      </div>
    )
  }
}
