import React from 'react';
import axios from 'axios';
import RadioButtonList from '../shared/RadioButtonList/RadioButtonList';
import SummaryContent from './SummaryContent/SummaryContent';

const cohorts = [
  { name: 'RPT18', isChecked: false },
  { name: 'RPT19', isChecked: false },
  { name: 'RPT20', isChecked: false },
  { name: 'RPT21', isChecked: false },
  { name: 'RPT22', isChecked: false }
];
export default class CohortSummary extends React.Component {
  constructor() {
    super();
    this.state = {
      cohorts,
      curriculum: {}
    };
    this.handleRadioButtonChange = this.handleRadioButtonChange.bind(this);
    this.getCurriculum = this.getCurriculum.bind(this);
  }

  componentDidMount() {
    this.getCurriculum();
  }

  getCurriculum() {
    axios
      .get(`http://localhost:9001/curriculum/1086`)
      .then((response) => {
        if (response && response.data) {
          this.setState({ curriculum: response.data });
          console.log(response.data);
        }
      })
      .catch((error) => {
        throw error;
      });
  }

  handleRadioButtonChange(cohort) {
    const { cohorts } = this.state;
    const newCohortList = cohorts.slice();
    newCohortList.forEach((e) => {
      if (e.name === cohort) {
        e.isChecked = true;
      } else {
        e.isChecked = false;
      }
    });
    this.setState({ cohorts: newCohortList });
  }

  render() {
    const { curriculum } = this.state;
    return (
      <div data-testid="cohort-summary">
        <RadioButtonList
          cohorts={cohorts}
          handleRadioButtonChange={this.handleRadioButtonChange}
          showDetails={this.getCurriculum}
          buttonLabel="Show Summary"
        />
        <SummaryContent curriculum={curriculum} />
      </div>
    );
  }
}
