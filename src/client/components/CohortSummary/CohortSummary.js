import React from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import RadioButtonList from '../shared/RadioButtonList/RadioButtonList';
import SummaryContent from './SummaryContent/SummaryContent';

export default class CohortSummary extends React.Component {
  constructor() {
    super();
    this.state = {
      cohorts: [],
      curriculum: {},
      selectedCohort: ''
    };
  }

  componentDidMount() {
    this.getCohorts();
  }

  getCohorts = () => {
    axios
      .get(`http://localhost:9001/api/cohorts`)
      .then((response) => {
        if (response && response.data) {
          const cohorts = response.data.data
            .map((cohort) => ({
              name: cohort.cohort_id,
              cohortId: cohort.cohort_id,
              isChecked: false
            }))
            .sort((a, b) => a.cohort_id - b.cohort_id);
          this.setState({ cohorts });
        }
      })
      .catch((error) => {
        throw error;
      });
  };

  getCurriculum = () => {
    const { selectedCohort } = this.state;
    axios
      .get(`http://localhost:9001/curriculum/${selectedCohort}`)
      .then((response) => {
        if (response && response.data) {
          this.setState({ curriculum: response.data });
          // eslint-disable-next-line no-console
          console.log(response.data);
        }
      })
      .catch((error) => {
        throw error;
      });
  };

  handleRadioButtonChange = (cohort) => {
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
  };

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
