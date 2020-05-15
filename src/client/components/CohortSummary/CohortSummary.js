import React from 'react';
import axios from 'axios';
import RadioButtonList from '../shared/RadioButtonList/RadioButtonList';
import SummaryContent from './SummaryContent/SummaryContent';
import { Container } from 'semantic-ui-react';

const cohortsList = [
  { name: 'DEMO', isChecked: false },
  { name: 'RPT19', isChecked: false },
  { name: 'RPT20', isChecked: false },
  { name: 'RPT21', isChecked: false },
  { name: 'RPT22', isChecked: false }
];
export default class CohortSummary extends React.Component {
  constructor() {
    super();
    this.state = {
      cohorts: cohortsList,
      curriculum: {},
      selectedCohort: ''
    };
    this.handleRadioButtonChange = this.handleRadioButtonChange.bind(this);
    this.getCurriculum = this.getCurriculum.bind(this);
  }

  getCurriculum() {
    const { selectedCohort } = this.state;
    axios
      .get(`http://localhost:9001/curriculum/${selectedCohort}`)
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
    let { selectedCohort } = this.state;
    const newCohortList = cohorts.slice();
    newCohortList.forEach((e) => {
      if (e.name === cohort) {
        e.isChecked = true;
        selectedCohort = e.name;
      } else {
        e.isChecked = false;
      }
    });
    this.setState({ cohorts: newCohortList, selectedCohort });
  }

  render() {
    const { curriculum, cohorts } = this.state;
    return (
      <Container data-testid="cohort-summary" style={{ width: '60%', minWidth: '540px' }}>
        <RadioButtonList
          cohorts={cohorts}
          handleRadioButtonChange={this.handleRadioButtonChange}
          showDetails={this.getCurriculum}
          buttonLabel="Show Summary"
        />
        <SummaryContent curriculum={curriculum} />
      </Container>
    );
  }
}
