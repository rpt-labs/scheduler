
import React from 'react';
import PropTypes from 'prop-types';
import { Header, List} from 'semantic-ui-react';

const SummaryContent = props => {
  const { curriculum } = props;
  const { cohort_title: title, sections } = curriculum;
  const sectionDetails = sections ? sections.map(section => ({title:section.title, units: section.units})) : [];

  return (
    <div data-testid="summary-content">
      <Header as='h1' textAlign='center'>{title}</Header>
      <List active="true" bulleted>
        {sectionDetails.map(section =>(
          <List.Item key={section.title}>
            {section.title}
            <List.List>
              {section.units.map(unit => <List.Item key={unit.title}>{unit.title}</List.Item>)}
            </List.List>
          </List.Item>)
        )}
      </List>
    </div>
  );
};

export default SummaryContent;
